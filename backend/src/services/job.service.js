import prisma from "../config/prisma.js";
export const createJobService = async (customerId, jobData) => {
  const { title, description, category, location, budget, requiredDate } =
    jobData;

  // Create new job
  const job = await prisma.job.create({
    data: {
      customerId,
      title,
      description,
      category,
      location,
      budget,
      requiredDate: requiredDate ? new Date(requiredDate) : null,
    },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      location: true,
      budget: true,
      status: true,
      requiredDate: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return job;
};

export const getAllJobsService = async (query) => {
  const { page = 1, limit = 10, search, category, location, status } = query;

  const where = {};

  // Search by title
  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  // Filter by category
  if (category) {
    where.category = category;
  }

  // Filter by location
  if (location) {
    where.location = {
      contains: location,
      mode: "insensitive",
    };
  }

  // Filter by status
  if (status) {
    where.status = status;
  }

  const jobs = await prisma.job.findMany({
    where,

    orderBy: {
      createdAt: "desc",
    },

    skip: (Number(page) - 1) * Number(limit),

    take: Number(limit),

    include: {
      customer: {
        select: {
          fullName: true,
          email: true,
        },
      },
    },
  });

  const totalJobs = await prisma.job.count({
    where,
  });

  return {
    jobs,
    pagination: {
      total: totalJobs,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalJobs / Number(limit)),
    },
  };
};

export const getJobByIdService = async (jobId) => {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    include: {
      customer: {
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  return job;
};

export const updateJobService = async (jobId, customerId, jobData) => {
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

  if (job.customerId !== customerId) {
    const error = new Error("You are not authorized to update this job");
    error.statusCode = 403;
    throw error;
  }

  const { title, description, category, location, budget, requiredDate } =
    jobData;

  const updatedJob = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      title,
      description,
      category,
      location,
      budget,
      requiredDate: requiredDate ? new Date(requiredDate) : null,
    },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      location: true,
      budget: true,
      status: true,
      requiredDate: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedJob;
};

export const deleteJobService = async (jobId, customerId) => {
  // Find the job
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  // Job not found
  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  // Ownership check
  if (job.customerId !== customerId) {
    const error = new Error("You are not authorized to delete this job");
    error.statusCode = 403;
    throw error;
  }

  // Delete the job
  await prisma.job.delete({
    where: {
      id: jobId,
    },
  });

  return;
};

export const updateJobStatusService = async (jobId, customerId, status) => {
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
    const error = new Error("You are not authorized to update this job");
    error.statusCode = 403;
    throw error;
  }

  // Validate Status
  const allowedStatus = ["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

  if (!allowedStatus.includes(status)) {
    const error = new Error("Invalid job status");
    error.statusCode = 400;
    throw error;
  }

  // Update Status
  const updatedJob = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      status,
    },
    select: {
      id: true,
      title: true,
      status: true,
      updatedAt: true,
    },
  });

  return updatedJob;
};

export const getMyJobsService = async (customerId) => {
  const jobs = await prisma.job.findMany({
    where: {
      customerId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs;
};
