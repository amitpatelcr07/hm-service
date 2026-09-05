import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/email.js";
import { generateToken } from "../utils/jwt.js";
import {
  createRefreshToken,
  hashRefreshToken,
  refreshTokenMaxAge,
} from "../utils/refresh-token.js";

// export const registerUser = async (data) => {
//   console.log("checking register page");
//   const { fullName, email, password, phone, role } = data;

//   if (!["CUSTOMER", "WORKER"].includes(role)) {
//     throw new Error("Choose CUSTOMER or WORKER when registering");
//   }

//   const existingUser = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (existingUser) {
//     throw new Error("Email already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await prisma.$transaction(async (tx) => {
//     const createdUser = await tx.user.create({
//       data: {
//         fullName,
//         email,
//         password: hashedPassword,
//         phone,
//         role,
//       },
//       select: {
//         id: true,
//         fullName: true,
//         email: true,
//         phone: true,
//         role: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     if (role === "WORKER") {
//       await tx.workerProfile.create({
//         data: {
//           userId: createdUser.id,
//           bio: null,
//           skills: [],
//           experience: 0,
//           hourlyRate: 0,
//           isAvailable: true,
//         },
//       });
//     }

//     return createdUser;
//   });

//   return user;
// };
console.log("check");
export const registerUser = async (data) => {
  const { fullName, email, password, phone, role } = data;

  // 1. Check existing user
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      phone,
      role,
      emailVerified: false,
    },

    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // 4. Generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // 5. Expire after 24 hours
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // 6. Save token
  await prisma.emailVerificationToken.create({
    data: {
      token: verificationToken,
      userId: user.id,
      expiresAt,
    },
  });

  // 7. Send verification email
  await sendVerificationEmail(user.email, verificationToken);

  return user;
};

export const verifyEmailService = async (token) => {
  // 1. Find verification token
  const verificationToken = await prisma.emailVerificationToken.findUnique({
    where: {
      token,
    },
  });

  // 2. Token does not exist
  if (!verificationToken) {
    const error = new Error("Invalid verification token");
    error.statusCode = 400;
    throw error;
  }

  // 3. Check token expiry
  if (verificationToken.expiresAt < new Date()) {
    const error = new Error("Verification token has expired");
    error.statusCode = 400;
    throw error;
  }

  // 4. Update user's email verification status
  const user = await prisma.user.update({
    where: {
      id: verificationToken.userId,
    },
    data: {
      emailVerified: true,
    },

    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      emailVerified: true,
    },
  });

  // 5. Delete used verification token
  await prisma.emailVerificationToken.delete({
    where: {
      id: verificationToken.id,
    },
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
      emailVerified: true,
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

  if (!user.emailVerified) {
    throw new Error("Please verify your email before logging in");
  }
  const { password: _password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

const publicUserSelect = {
  id: true,
  fullName: true,
  email: true,
  phone: true,
  role: true,
  emailVerified: true,
  createdAt: true,
  updatedAt: true,
};

const createSession = async (user) => {
  const refreshToken = createRefreshToken();
  await prisma.refreshToken.create({
    data: {
      tokenHash: hashRefreshToken(refreshToken),
      userId: user.id,
      expiresAt: new Date(Date.now() + refreshTokenMaxAge),
    },
  });

  return { accessToken: generateToken(user), refreshToken, user };
};

export const createLoginSession = async (user) => createSession(user);

export const refreshSession = async (rawRefreshToken) => {
  const storedToken = await prisma.refreshToken.findUnique({
    where: { tokenHash: hashRefreshToken(rawRefreshToken) },
    include: { user: { select: publicUserSelect } },
  });

  if (!storedToken) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 401;
    throw error;
  }

  if (storedToken.revokedAt || storedToken.expiresAt <= new Date()) {
    if (storedToken.revokedAt) {
      await prisma.refreshToken.updateMany({
        where: { userId: storedToken.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }
    const error = new Error("Refresh token is expired or revoked");
    error.statusCode = 401;
    throw error;
  }

  const nextRefreshToken = createRefreshToken();
  const nextExpiresAt = new Date(Date.now() + refreshTokenMaxAge);
  await prisma.$transaction([
    prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revokedAt: new Date() },
    }),
    prisma.refreshToken.create({
      data: {
        tokenHash: hashRefreshToken(nextRefreshToken),
        userId: storedToken.userId,
        expiresAt: nextExpiresAt,
      },
    }),
  ]);

  return {
    accessToken: generateToken(storedToken.user),
    refreshToken: nextRefreshToken,
    user: storedToken.user,
  };
};

export const revokeRefreshToken = async (rawRefreshToken) => {
  if (!rawRefreshToken) return;

  await prisma.refreshToken.updateMany({
    where: { tokenHash: hashRefreshToken(rawRefreshToken), revokedAt: null },
    data: { revokedAt: new Date() },
  });
};
