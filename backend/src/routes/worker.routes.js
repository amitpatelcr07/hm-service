import express from "express";
import {
  registerWorker,
  updateAvailability,
  getWorkerProfile,
  updateWorkerProfile,
  getWorkerById,
} from "../controllers/worker.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
const router = express.Router();

// Create Worker Profile
router.post("/profile", authenticateUser, authorize("WORKER"), registerWorker);
router.get("/profile", authenticateUser, authorize("WORKER"), getWorkerProfile);
router.put(
  "/profile",
  authenticateUser,
  authorize("WORKER"),
  updateWorkerProfile,
);

router.get(
  "/:id",
  authenticateUser,
  authorize("CUSTOMER", "WORKER"),
  getWorkerById,
);
router.patch(
  "/availability",
  authenticateUser,
  authorize("WORKER"),
  updateAvailability,
);

export default router;
