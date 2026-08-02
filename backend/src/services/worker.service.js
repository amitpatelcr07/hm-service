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
