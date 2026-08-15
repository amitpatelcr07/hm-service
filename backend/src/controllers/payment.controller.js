import {
  createPaymentService,
  getPaymentByJobService,
  updatePaymentStatusService,
  getPaymentsService,
} from "../services/payment.service.js";
export const createPayment = async (req, res) => {
  try {
    const customerId = req.user.userId;

    const payment = await createPaymentService(customerId, req.body);

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPaymentByJob = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const { jobId } = req.params;

    const payment = await getPaymentByJobService(customerId, jobId);

    return res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const customerId = req.user.userId;

    const paymentId = req.params.id;

    const { status } = req.body;

    const payment = await updatePaymentStatusService(
      paymentId,
      customerId,
      status,
    );

    return res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPayments = async (req, res) => {
  try {
    const customerId = req.user.userId;

    const payments = await getPaymentsService(customerId);

    return res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
