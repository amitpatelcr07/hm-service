import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const getChatAccess = async (jobId, user) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      customer: { select: { id: true, fullName: true } },
      applications: {
        where: { status: "ACCEPTED" },
        include: {
          workerProfile: {
            select: {
              userId: true,
              user: { select: { id: true, fullName: true } },
            },
          },
        },
      },
    },
  });

  if (!job) throw new Error("Job not found");

  const acceptedWorker = job.applications[0]?.workerProfile?.user;
  const isCustomer = user.role === "CUSTOMER" && job.customerId === user.userId;
  const isAcceptedWorker =
    user.role === "WORKER" && acceptedWorker?.id === user.userId;

  if (!isCustomer && !isAcceptedWorker) {
    throw new Error(
      "Chat is available only to the customer and accepted worker",
    );
  }

  return {
    job,
    participant: isCustomer ? acceptedWorker : job.customer,
    receiverId: isCustomer ? acceptedWorker?.id : job.customerId,
  };
};

const sendChatError = (socket, error) => {
  socket.emit("chat_error", error.message || "Unable to access chat");
};

export const initializeSocket = (io) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Authentication token required"));

      socket.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      next(new Error("Invalid or expired authentication token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("join_job_chat", async (jobId) => {
      try {
        const access = await getChatAccess(jobId, socket.user);
        const messages = await prisma.message.findMany({
          where: { jobId },
          orderBy: { createdAt: "asc" },
        });

        await socket.join(`job:${jobId}`);
        socket.emit("chat_ready", {
          job: { id: access.job.id, title: access.job.title },
          participant: access.participant,
          messages,
        });
      } catch (error) {
        sendChatError(socket, error);
      }
    });

    socket.on("send_message", async ({ jobId, message }) => {
      try {
        const text = typeof message === "string" ? message.trim() : "";
        if (!text) throw new Error("Message cannot be empty");

        const access = await getChatAccess(jobId, socket.user);
        if (!access.receiverId) {
          throw new Error("No accepted worker is assigned to this job");
        }

        const savedMessage = await prisma.message.create({
          data: {
            jobId,
            senderId: socket.user.userId,
            receiverId: access.receiverId,
            message: text,
          },
        });

        io.to(`job:${jobId}`).emit("new_message", savedMessage);
      } catch (error) {
        sendChatError(socket, error);
      }
    });

    socket.on("leave_job_chat", (jobId) => {
      socket.leave(`job:${jobId}`);
    });
  });
};
