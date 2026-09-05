import express from "express";
import {
  register,
  login,
  verifyEmail,
  refresh,
  logout,
} from "../controllers/auth.controller.js";
import { me } from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authenticateUser, me);

export default router;
