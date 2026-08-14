import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import {
  createPayment,
  getPaymentByJob,
  updatePaymentStatus,
  getPayments,
} from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/", authenticateUser, authorize("CUSTOMER"), createPayment);

router.get(
  "/job/:jobId",
  authenticateUser,
  authorize("CUSTOMER"),
  getPaymentByJob,
);

router.patch(
  "/:id/status",
  authenticateUser,
  authorize("CUSTOMER"),
  updatePaymentStatus,
);

router.get("/", authenticateUser, authorize("CUSTOMER"), getPayments);
export default router;
