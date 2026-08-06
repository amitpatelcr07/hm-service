import prisma from "../config/prisma.js";

export const applyForJobService = async (jobId, userId, applicationData) => {
  const { proposal, expectedPrice, estimatedDays } = applicationData;

  // Step 1 - Find Worker Profile
  const workerProfile = await prisma.workerProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!workerProfile) {
    const error = new Error("Worker profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Step 2 - Check Job Exists
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

  // Step 3 - Prevent Duplicate Applications
  const existingApplication = await prisma.jobApplication.findUnique({
    where: {
      jobId_workerProfileId: {
        jobId,
        workerProfileId: workerProfile.id,
      },
    },
  });

  if (existingApplication) {
    const error = new Error("You have already applied for this job");
    error.statusCode = 409;
    throw error;
  }

  // Step 4 - Create Application
  const application = await prisma.jobApplication.create({
    data: {
      jobId,
      workerProfileId: workerProfile.id,
      proposal,
      expectedPrice,
      estimatedDays,
    },
    select: {
      id: true,
      proposal: true,
      expectedPrice: true,
      estimatedDays: true,
      status: true,
      createdAt: true,
    },
  });

  return application;
};

export const getMyApplicationsService = async (userId) => {
  // Find Worker Profile
  const workerProfile = await prisma.workerProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!workerProfile) {
    const error = new Error("Worker profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Find Applications
  const applications = await prisma.jobApplication.findMany({
    where: {
      workerProfileId: workerProfile.id,
    },

    include: {
      job: {
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          location: true,
          budget: true,
          status: true,
          requiredDate: true,

          customer: {
            select: {
              fullName: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return applications;
};

export const getJobApplicationsService = async (jobId, customerId) => {
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
      "You are not authorized to view applications for this job",
    );
    error.statusCode = 403;
    throw error;
  }

  // Get Applications
  const applications = await prisma.jobApplication.findMany({
    where: {
      jobId,
    },

    include: {
      workerProfile: {
        select: {
          id: true,
          bio: true,
          skills: true,
          experience: true,
          hourlyRate: true,
          isAvailable: true,

          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return applications;
};

export const updateApplicationStatusService = async (
  applicationId,
  customerId,
  status,
) => {
  if (!["ACCEPTED", "REJECTED"].includes(status)) {
    const error = new Error("Invalid status");
    error.statusCode = 400;
    throw error;
  }

  const application = await prisma.jobApplication.findUnique({
    where: {
      id: applicationId,
    },

    include: {
      job: true,
    },
  });

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  if (application.job.customerId !== customerId) {
    const error = new Error("Unauthorized");
    error.statusCode = 403;
    throw error;
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedApplication = await tx.jobApplication.update({
      where: {
        id: applicationId,
      },

      data: {
        status,
      },
    });

    if (status === "ACCEPTED") {
      await tx.job.update({
        where: {
          id: application.jobId,
        },

        data: {
          status: "IN_PROGRESS",
        },
      });

      await tx.jobApplication.updateMany({
        where: {
          jobId: application.jobId,
          id: {
            not: applicationId,
          },
          status: "PENDING",
        },

        data: {
          status: "REJECTED",
        },
      });
    }

    return updatedApplication;
  });

  return result;
};

export const getApplicationByIdService = async (
  applicationId,
  userId,
  role,
) => {
  const application = await prisma.jobApplication.findUnique({
    where: {
      id: applicationId,
    },

    include: {
      job: {
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
      },

      workerProfile: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },
  });

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  if (role === "CUSTOMER") {
    if (application.job.customerId !== userId) {
      const error = new Error("Unauthorized");
      error.statusCode = 403;
      throw error;
    }
  }

  if (role === "WORKER") {
    if (application.workerProfile.userId !== userId) {
      const error = new Error("Unauthorized");
      error.statusCode = 403;
      throw error;
    }
  }

  return application;
};
