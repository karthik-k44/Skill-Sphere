import express from "express";
import { authMiddleware } from "../../../middlewares/auth-middleware";
import { AIAnalyzerController } from "./ai-analyzer-controller";

const router = express.Router();

router.post("/", authMiddleware, AIAnalyzerController.CreateAIGeneratedInsights);
router.get("/", authMiddleware, AIAnalyzerController.GetAIGeneratedInsights);

export default router;
