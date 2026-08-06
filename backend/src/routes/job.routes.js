import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  updateJobStatus,
  getMyJobs,
} from "../controllers/job.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { applyForJob } from "../controllers/application.controller.js";
import { getJobApplications } from "../controllers/application.controller.js";
const router = express.Router();

router.post("/", authenticateUser, authorize("CUSTOMER"), createJob);
router.get("/", getAllJobs);
router.get("/my-jobs", authenticateUser, authorize("CUSTOMER"), getMyJobs);
router.get("/:id", getJobById);
router.put("/:id", authenticateUser, authorize("CUSTOMER"), updateJob);
router.delete("/:id", authenticateUser, authorize("CUSTOMER"), deleteJob);
router.patch(
  "/:id/status",
  authenticateUser,
  authorize("CUSTOMER"),
  updateJobStatus,
);
router.post("/:id/apply", authenticateUser, authorize("WORKER"), applyForJob);
router.get(
  "/:id/applications",
  authenticateUser,
  authorize("CUSTOMER"),
  getJobApplications,
);
export default router;
