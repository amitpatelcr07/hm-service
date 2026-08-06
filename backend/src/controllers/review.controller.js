import {
  createReviewService,
  getWorkerReviewsService,
  getReviewByIdService,
  updateReviewService,
  deleteReviewService,
} from "../services/review.service.js";

export const createReview = async (req, res) => {
  try {
    const customerId = req.user.userId;

    const review = await createReviewService(customerId, req.body);

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWorkerReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await getWorkerReviewsService(id);

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await getReviewByIdService(id);

    return res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const { id } = req.params;

    const review = await updateReviewService(id, customerId, req.body);

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const { id } = req.params;

    await deleteReviewService(id, customerId);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
