import express from "express";
const router = express.Router();

import { authenticateUser } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import {
  getMyApplications,
  updateApplicationStatus,
  getApplicationById,
} from "../controllers/application.controller.js";

router.get(
  "/my-applications",
  authenticateUser,
  authorize("WORKER"),
  getMyApplications,
);

router.patch(
  "/:id/status",
  authenticateUser,
  authorize("CUSTOMER"),
  updateApplicationStatus,
);

router.get("/:id", authenticateUser, getApplicationById);
export default router;
