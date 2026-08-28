import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { createPayment, customerConfirmCash, workerConfirmCash, workerDisputeCash, resolveCashPayment, getPaymentByJob, getPayments, getWorkerPayments, getAdminReviewPayments, getReceipt } from "../controllers/payment.controller.js";

const router = express.Router();
router.post("/", authenticateUser, authorize("CUSTOMER"), createPayment);
router.get("/", authenticateUser, authorize("CUSTOMER"), getPayments);
router.get("/worker", authenticateUser, authorize("WORKER"), getWorkerPayments);
router.get("/admin/review", authenticateUser, authorize("ADMIN"), getAdminReviewPayments);
router.get("/job/:jobId", authenticateUser, authorize("CUSTOMER", "WORKER"), getPaymentByJob);
router.post("/:id/cash/customer-confirm", authenticateUser, authorize("CUSTOMER"), customerConfirmCash);
router.post("/:id/cash/worker-confirm", authenticateUser, authorize("WORKER"), workerConfirmCash);
router.post("/:id/cash/dispute", authenticateUser, authorize("WORKER"), workerDisputeCash);
router.post("/:id/cash/resolve", authenticateUser, authorize("ADMIN"), resolveCashPayment);
router.get("/:id/receipt", authenticateUser, authorize("CUSTOMER", "WORKER", "ADMIN"), getReceipt);
export default router;
