import express from "express";
import { getApplications } from "../controllers/application.controller.js";

const router = express.Router();

router.get("/", getApplications);

export default router;
