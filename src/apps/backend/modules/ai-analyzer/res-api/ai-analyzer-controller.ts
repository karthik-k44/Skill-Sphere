import type { Response } from "express";
import type { AuthenticatedRequest } from "../../../middlewares/auth-middleware";
import AIAnalyzerService from "../ai-analyzer-service";

export class AIAnalyzerController {
  public static analyzeProfile = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    try {
      if (!userId) {
        throw new Error("User ID not found in request");
      }

      const result = await AIAnalyzerService.GetAIGeneratedInsights(userId);

      return res.status(200).json({
        success: true,
        message: "AI analysis generated",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  };
}
