import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

export const registerUser = async (data) => {
  const { fullName, email, password, phone, role } = data;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  const user = await prisma.user.create({
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

  return user;
};

export const loginUser = async (email, password) => {
  // Find user by email
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
  const { password: hashedPassword, ...userWithoutPassword } = user;
  console.log("User found in loginUser:", userWithoutPassword);
  if (!user) {
    throw new Error("User not found");
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return userWithoutPassword;
};
