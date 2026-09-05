import prisma from "../config/prisma.js";
import { randomUUID } from "crypto";

const fail = (message, statusCode = 400) => Object.assign(new Error(message), { statusCode });
export const isAllowedCashTransition = (from, to) => ({
  CASH_PENDING: ["CASH_CUSTOMER_CONFIRMED"],
  CASH_CUSTOMER_CONFIRMED: ["SUCCESS", "CASH_DISPUTED", "CASH_REVIEW"],
  CASH_DISPUTED: ["SUCCESS", "FAILED", "REFUNDED"],
  CASH_REVIEW: ["SUCCESS", "FAILED", "REFUNDED"],
}[from] || []).includes(to);
const receiptNumber = () => `HC-CASH-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 8).toUpperCase()}`;
const audit = (tx, paymentId, actorId, actorRole, action, previousStatus, newStatus, note, metadata) => tx.paymentAuditLog.create({ data: { paymentId, actorId, actorRole, action, previousStatus, newStatus, note, metadata } });
const details = (where) =>
  prisma.payment.findUnique({
    where,
    include: {
      job: {
        include: {
          customer: { select: { id: true, fullName: true, email: true } },
          applications: {
            where: { status: "ACCEPTED" },
            include: {
              workerProfile: {
                include: { user: { select: { id: true, fullName: true, email: true } } },
              },
            },
          },
        },
      },
      auditLogs: { orderBy: { createdAt: "asc" } },
    },
  });
const customer = (payment, userId) => { if (!payment || payment.job.customerId !== userId) throw fail("Payment not found", 404); };
const workerUser = (payment) => payment.job.applications[0]?.workerProfile?.user;
const worker = (payment, userId) => { if (!payment || workerUser(payment)?.id !== userId) throw fail("Payment not found", 404); };

export const createPaymentService = async (customerId, { jobId, paymentMethod }) => {
  if (!jobId || !["CASH", "PHONEPE", "UPI", "CARD"].includes(paymentMethod)) throw fail("Choose a valid payment method");
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw fail("Job not found", 404);
  if (job.customerId !== customerId) throw fail("You are not authorized to make payment for this job", 403);
  if (job.status !== "COMPLETED") throw fail("Payment can only be created after customer job-completion confirmation");
  if (await prisma.payment.findUnique({ where: { jobId } })) throw fail("Payment already exists for this job", 409);
  return prisma.$transaction(async (tx) => {
    const status = paymentMethod === "CASH" ? "CASH_PENDING" : "PENDING";
    const payment = await tx.payment.create({ data: { jobId, amount: job.budget, paymentMethod, status, receiptNumber: paymentMethod === "CASH" ? receiptNumber() : null } });
    await audit(tx, payment.id, customerId, "CUSTOMER", "PAYMENT_CREATED", null, status, null, { paymentMethod });
    return payment;
  });
};

export const customerConfirmCashService = async (paymentId, customerId) => {
  const payment = await details({ id: paymentId }); customer(payment, customerId);
  if (payment.paymentMethod !== "CASH" || payment.status !== "CASH_PENDING") throw fail("This cash payment cannot be confirmed at this stage");
  return prisma.$transaction(async (tx) => {
    const now = new Date(), next = "CASH_CUSTOMER_CONFIRMED";
    const updated = await tx.payment.update({ where: { id: payment.id }, data: { status: next, customerCashConfirmedAt: now, customerCashConfirmedBy: customerId, workerConfirmationDeadline: new Date(now.getTime() + 604800000) } });
    await audit(tx, payment.id, customerId, "CUSTOMER", "CASH_HANDED_OVER", payment.status, next);
    return updated;
  });
};

export const workerConfirmCashService = async (paymentId, userId) => {
  const payment = await details({ id: paymentId }); worker(payment, userId);
  if (payment.paymentMethod !== "CASH" || payment.status !== "CASH_CUSTOMER_CONFIRMED") throw fail("This payment is not waiting for worker confirmation");
  return prisma.$transaction(async (tx) => {
    const now = new Date();
    const updated = await tx.payment.update({ where: { id: payment.id }, data: { status: "SUCCESS", workerCashConfirmedAt: now, workerCashConfirmedBy: userId, paidAt: now } });
    await audit(tx, payment.id, userId, "WORKER", "CASH_RECEIVED", payment.status, "SUCCESS");
    return updated;
  });
};

export const workerDisputeCashService = async (paymentId, userId, disputeReason) => {
  if (!disputeReason?.trim()) throw fail("A dispute reason is required");
  const payment = await details({ id: paymentId }); worker(payment, userId);
  if (payment.paymentMethod !== "CASH" || payment.status !== "CASH_CUSTOMER_CONFIRMED") throw fail("This payment cannot be disputed at this stage");
  return prisma.$transaction(async (tx) => {
    const updated = await tx.payment.update({ where: { id: payment.id }, data: { status: "CASH_DISPUTED", disputeReason: disputeReason.trim() } });
    await audit(tx, payment.id, userId, "WORKER", "CASH_DISPUTED", payment.status, "CASH_DISPUTED", disputeReason.trim()); return updated;
  });
};

export const resolveCashPaymentService = async (paymentId, adminId, { resolution, resolutionNote }) => {
  if (!["SUCCESS", "FAILED", "REFUNDED"].includes(resolution) || !resolutionNote?.trim()) throw fail("A resolution and resolution note are required");
  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) throw fail("Payment not found", 404);
  if (!["CASH_DISPUTED", "CASH_REVIEW"].includes(payment.status)) throw fail("Only disputed or review cash payments can be resolved");
  return prisma.$transaction(async (tx) => { const now = new Date(); const updated = await tx.payment.update({ where: { id: payment.id }, data: { status: resolution, resolvedBy: adminId, resolvedAt: now, resolutionNote: resolutionNote.trim(), paidAt: resolution === "SUCCESS" ? now : null } }); await audit(tx, payment.id, adminId, "ADMIN", "CASH_RESOLVED", payment.status, resolution, resolutionNote.trim()); return updated; });
};

export const expireCashConfirmationsService = async () => {
  const expired = await prisma.payment.findMany({ where: { paymentMethod: "CASH", status: "CASH_CUSTOMER_CONFIRMED", workerConfirmationDeadline: { lt: new Date() } } });
  for (const payment of expired) await prisma.$transaction(async (tx) => { const result = await tx.payment.updateMany({ where: { id: payment.id, status: "CASH_CUSTOMER_CONFIRMED" }, data: { status: "CASH_REVIEW" } }); if (result.count) await audit(tx, payment.id, null, null, "WORKER_CONFIRMATION_EXPIRED", "CASH_CUSTOMER_CONFIRMED", "CASH_REVIEW", "Worker confirmation deadline expired"); });
  return expired.length;
};

export const getPaymentByJobService = async (userId, jobId, role = "CUSTOMER") => { const payment = await details({ jobId }); if (role === "WORKER") worker(payment, userId); else customer(payment, userId); return payment; };
export const getPaymentsService = async (customerId) => prisma.payment.findMany({ where: { job: { customerId } }, include: { job: { select: { id: true, title: true, category: true, location: true, budget: true, status: true } } }, orderBy: { createdAt: "desc" } });
export const getWorkerCashPaymentsService = async (userId) => prisma.payment.findMany({ where: { paymentMethod: "CASH", job: { applications: { some: { status: "ACCEPTED", workerProfile: { userId } } } } }, include: { job: { select: { id: true, title: true, budget: true, customer: { select: { fullName: true } } } } }, orderBy: { createdAt: "desc" } });
export const getAdminReviewPaymentsService = async () => prisma.payment.findMany({ where: { status: { in: ["CASH_DISPUTED", "CASH_REVIEW"] } }, include: { job: { select: { id: true, title: true, customer: { select: { fullName: true } }, applications: { where: { status: "ACCEPTED" }, include: { workerProfile: { include: { user: { select: { fullName: true } } } } } } } }, auditLogs: { orderBy: { createdAt: "asc" } } }, orderBy: { createdAt: "asc" } });
export const getReceiptService = async (paymentId, userId, role) => { const payment = await details({ id: paymentId }); if (role === "CUSTOMER") customer(payment, userId); else if (role === "WORKER") worker(payment, userId); else if (role !== "ADMIN") throw fail("Payment not found", 404); if (payment.status !== "SUCCESS" || !payment.receiptNumber) throw fail("Receipt is available after a successful cash payment"); return payment; };
