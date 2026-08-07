import prisma from "../config/prismaClient.js";

export const createPaymentService = async (customerId, data) => {
  const { jobId, amount, paymentMethod } = data;

  // Find Job
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check
  if (job.customerId !== customerId) {
    const error = new Error(
      "You are not authorized to make payment for this job",
    );
    error.statusCode = 403;
    throw error;
  }

  // Job Status Check
  if (job.status !== "COMPLETED") {
    const error = new Error("Payment can only be made after job completion");
    error.statusCode = 400;
    throw error;
  }

  // Existing Payment Check
  const existingPayment = await prisma.payment.findUnique({
    where: {
      jobId,
    },
  });

  if (existingPayment) {
    const error = new Error("Payment already exists for this job");
    error.statusCode = 409;
    throw error;
  }

  // Create Payment
  const payment = await prisma.payment.create({
    data: {
      jobId,
      amount,
      paymentMethod,
      status: "PENDING",
    },
  });

  return payment;
};

export const getPaymentByJobService = async (customerId, jobId) => {
  // Find Job
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check
  if (job.customerId !== customerId) {
    const error = new Error("You are not authorized to view this payment");
    error.statusCode = 403;
    throw error;
  }

  // Find Payment
  const payment = await prisma.payment.findUnique({
    where: {
      jobId,
    },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          status: true,
          budget: true,
        },
      },
    },
  });

  if (!payment) {
    const error = new Error("Payment not found");
    error.statusCode = 404;
    throw error;
  }

  return payment;
};

export const updatePaymentStatusService = async (
  paymentId,
  customerId,
  status,
) => {
  // Validate Status
  if (!["SUCCESS", "FAILED"].includes(status)) {
    const error = new Error("Invalid payment status");
    error.statusCode = 400;
    throw error;
  }

  // Find Payment
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
    include: {
      job: true,
    },
  });

  if (!payment) {
    const error = new Error("Payment not found");
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check
  if (payment.job.customerId !== customerId) {
    const error = new Error("You are not authorized to update this payment");
    error.statusCode = 403;
    throw error;
  }

  // Prevent Updating Successful Payment
  if (payment.status === "SUCCESS") {
    const error = new Error("Payment has already been completed");
    error.statusCode = 400;
    throw error;
  }

  // Update Data
  const updateData = {
    status,
  };

  if (status === "SUCCESS") {
    updateData.transactionId = `TXN-${Date.now()}`;
    updateData.paidAt = new Date();
  }

  const updatedPayment = await prisma.payment.update({
    where: {
      id: paymentId,
    },
    data: updateData,
  });

  return updatedPayment;
};

export const getPaymentsService = async (customerId) => {
  const payments = await prisma.payment.findMany({
    where: {
      job: {
        customerId,
      },
    },

    include: {
      job: {
        select: {
          id: true,
          title: true,
          category: true,
          location: true,
          budget: true,
          status: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return payments;
};
