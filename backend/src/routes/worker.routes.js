import express from "express";
import { registerWorker } from "../controllers/worker.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { getWorkerProfile } from "../controllers/worker.controller.js";

const router = express.Router();

// Create Worker Profile
router.post("/profile", authenticateUser, authorize("WORKER"), registerWorker);
router.get("/profile", authenticateUser, authorize("WORKER"), getWorkerProfile);

export default router;
