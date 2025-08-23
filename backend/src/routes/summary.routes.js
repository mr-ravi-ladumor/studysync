import Router from "express";
import { verifyAuthToken } from "../middlewares/auth.middleware.js";
import { getGeneralSummary } from "../controllers/summary.controllers.js";

const router = Router();

router.route("/").get(verifyAuthToken, getGeneralSummary);

export default router;
