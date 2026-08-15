import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

export const registerUser = async (data) => {
  const { fullName, email, password, phone, role } = data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        phone,
        role,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (role === "WORKER") {
      await tx.workerProfile.create({
        data: {
          userId: createdUser.id,
          bio: null,
          skills: [],
          experience: 0,
          hourlyRate: 0,
          isAvailable: true,
        },
      });
    }

    return createdUser;
  });

  return user;
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      password: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const { password: _password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};
