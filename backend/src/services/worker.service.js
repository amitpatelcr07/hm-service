import prisma from "../config/prisma.js";

export const createWorkerProfile = async (userId, profileData) => {
  const { bio, skills, experience, hourlyRate } = profileData;

  // Check if worker profile already exists
  const existingProfile = await prisma.workerProfile.findUnique({
    where: {
      userId,
    },
  });

  if (existingProfile) {
    throw new Error("Worker profile already exists");
  }

  // Create worker profile
  const workerProfile = await prisma.workerProfile.create({
    data: {
      userId,
      bio,
      skills,
      experience,
      hourlyRate,
    },
    select: {
      id: true,
      bio: true,
      skills: true,
      experience: true,
      hourlyRate: true,
      isAvailable: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return workerProfile;
};

export const getWorkerProfileData = async (userId) => {
  const profile = await prisma.workerProfile.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
      bio: true,
      skills: true,
      experience: true,
      hourlyRate: true,
      isAvailable: true,

      createdAt: true,
      updatedAt: true,
    },
  });

  return profile;
};

export const updateWorkerProfileData = async (userId, profileData) => {
  const { bio, skills, experience, hourlyRate } = profileData;

  const updatedProfile = await prisma.workerProfile.update({
    where: {
      userId,
    },
    data: {
      bio,

      skills,
      experience,
      hourlyRate,
    },
    select: {
      id: true,
      bio: true,
      skills: true,
      experience: true,
      hourlyRate: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedProfile;
};

export const getWorkerProfileById = async (workerId) => {
  const profile = await prisma.workerProfile.findUnique({
    where: {
      id: workerId,
    },
    include: {
      user: {
        select: {
          fullName: true,
          email: true,
        },
      },
    },
  });

  if (!profile) {
    const error = new Error("Worker profile not found");
    error.statusCode = 404;
    throw error;
  }

  return profile;
};

export const updateWorkerAvailability = async (userId, isAvailable) => {
  const profile = await prisma.workerProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    const error = new Error("Worker profile not found");
    error.statusCode = 404;
    throw error;
  }

  const updatedProfile = await prisma.workerProfile.update({
    where: {
      userId,
    },
    data: {
      isAvailable,
    },
    select: {
      id: true,
      isAvailable: true,
      updatedAt: true,
    },
  });

  return updatedProfile;
};
