import express from "express";
import {
  createReview,
  getWorkerReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authenticateUser, authorize("CUSTOMER"), createReview);
router.get("/worker/:id", getWorkerReviews);
router.get("/:id", getReviewById);
router.put("/:id", authenticateUser, authorize("CUSTOMER"), updateReview);
router.delete("/:id", authenticateUser, authorize("CUSTOMER"), deleteReview);
export default router;
