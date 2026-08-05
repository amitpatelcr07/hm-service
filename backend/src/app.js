import express from "express";
import authRoutes from "./routes/auth.routes.js";
import workerRoutes from "./routes/worker.routes.js";
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/worker", workerRoutes);
export default app;
