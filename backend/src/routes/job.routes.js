import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controllers/job.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
const router = express.Router();

router.post("/", authenticateUser, authorize("CUSTOMER"), createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.put("/:id", authenticateUser, authorize("CUSTOMER"), updateJob);
export default router;
