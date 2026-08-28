import { createPaymentService, customerConfirmCashService, workerConfirmCashService, workerDisputeCashService, resolveCashPaymentService, getPaymentByJobService, getPaymentsService, getWorkerCashPaymentsService, getAdminReviewPaymentsService, getReceiptService } from "../services/payment.service.js";

const respond = (handler) => async (req, res) => {
  try { return res.json({ success: true, data: await handler(req) }); }
  catch (error) { return res.status(error.statusCode || 500).json({ success: false, message: error.message }); }
};
export const createPayment = async (req, res) => {
  try { const payment = await createPaymentService(req.user.userId, req.body); return res.status(201).json({ success: true, message: "Payment created successfully", data: payment }); }
  catch (error) { return res.status(error.statusCode || 500).json({ success: false, message: error.message }); }
};
export const customerConfirmCash = respond((req) => customerConfirmCashService(req.params.id, req.user.userId));
export const workerConfirmCash = respond((req) => workerConfirmCashService(req.params.id, req.user.userId));
export const workerDisputeCash = respond((req) => workerDisputeCashService(req.params.id, req.user.userId, req.body.disputeReason));
export const resolveCashPayment = respond((req) => resolveCashPaymentService(req.params.id, req.user.userId, req.body));
export const getPaymentByJob = respond((req) => getPaymentByJobService(req.user.userId, req.params.jobId, req.user.role));
export const getPayments = respond((req) => getPaymentsService(req.user.userId));
export const getWorkerPayments = respond((req) => getWorkerCashPaymentsService(req.user.userId));
export const getAdminReviewPayments = respond(() => getAdminReviewPaymentsService());
export const getReceipt = respond((req) => getReceiptService(req.params.id, req.user.userId, req.user.role));
