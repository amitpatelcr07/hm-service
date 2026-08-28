import http from "http";
import { Server } from "socket.io";
import "dotenv/config";

import app from "./app.js";
import { initializeSocket } from "./sockets/socket.js";
import { expireCashConfirmationsService } from "./services/payment.service.js";
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initializeSocket(io);

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

expireCashConfirmationsService().catch(console.error);
setInterval(() => expireCashConfirmationsService().catch(console.error), 60 * 60 * 1000);
