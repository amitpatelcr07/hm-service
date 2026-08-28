import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:8000", {
  autoConnect: false,
  withCredentials: true,
});

export const connectSocket = (token) => {
  socket.auth = { token };
  socket.connect();
};

export default socket;
