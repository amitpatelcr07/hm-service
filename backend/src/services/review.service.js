import prisma from "../config/prisma.js";

export const createReviewService = async (customerId, data) => {
  const { jobId, rating, comment } = data;

  // Rating Validation
  if (rating < 1 || rating > 5) {
    const error = new Error("Rating must be between 1 and 5");
    error.statusCode = 400;
    throw error;
  }

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
    const error = new Error("Unauthorized");
    error.statusCode = 403;
    throw error;
  }

  // Job Completed Check
  if (job.status !== "COMPLETED") {
    const error = new Error("Review can only be added after job completion");
    error.statusCode = 400;
    throw error;
  }

  // Already Reviewed?
  const existingReview = await prisma.review.findUnique({
    where: {
      jobId_customerId: {
        jobId,
        customerId,
      },
    },
  });

  if (existingReview) {
    const error = new Error("You have already reviewed this job");
    error.statusCode = 400;
    throw error;
  }

  // Find Accepted Worker
  const acceptedApplication = await prisma.jobApplication.findFirst({
    where: {
      jobId,
      status: "ACCEPTED",
    },
  });

  if (!acceptedApplication) {
    const error = new Error("No accepted worker found for this job");
    error.statusCode = 404;
    throw error;
  }

  // Create Review
  const review = await prisma.review.create({
    data: {
      jobId,

      customerId,

      workerProfileId: acceptedApplication.workerProfileId,

      rating,

      comment,
    },
  });

  return review;
};

export const getWorkerReviewsService = async (workerProfileId) => {
  // Check worker exists
  const worker = await prisma.workerProfile.findUnique({
    where: {
      id: workerProfileId,
    },
  });

  if (!worker) {
    const error = new Error("Worker not found");
    error.statusCode = 404;
    throw error;
  }

  // Fetch reviews
  const reviews = await prisma.review.findMany({
    where: {
      workerProfileId,
    },

    include: {
      customer: {
        select: {
          fullName: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

export const getReviewByIdService = async (reviewId) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },

    include: {
      customer: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },

      workerProfile: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
      },

      job: {
        select: {
          id: true,
          title: true,
          category: true,
          status: true,
          budget: true,
        },
      },
    },
  });

  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  return review;
};

export const updateReviewService = async (reviewId, customerId, data) => {
  const { rating, comment } = data;

  // Find review
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  // Ownership check
  if (review.customerId !== customerId) {
    const error = new Error("You are not authorized to update this review");
    error.statusCode = 403;
    throw error;
  }

  // Validate rating
  if (rating !== undefined && (rating < 1 || rating > 5)) {
    const error = new Error("Rating must be between 1 and 5");
    error.statusCode = 400;
    throw error;
  }

  // Update review
  const updatedReview = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      rating,
      comment,
    },
  });

  return updatedReview;
};

export const deleteReviewService = async (reviewId, customerId) => {
  // Find review
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  // Owner check
  if (review.customerId !== customerId) {
    const error = new Error("You are not authorized to delete this review");
    error.statusCode = 403;
    throw error;
  }

  // Delete review
  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return;
};
