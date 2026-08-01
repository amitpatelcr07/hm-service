import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { me } from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateUser, me);

export default router;
