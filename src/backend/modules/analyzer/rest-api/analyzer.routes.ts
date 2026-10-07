import { Router } from "express";
import { AsyncHandler } from "@/backend/common/utils/async-handler";
import { IdParamsSchema } from "@/backend/common/utils/object-id";
import { RequireAuth } from "@/backend/middleware/auth";
import { aiLimiter } from "@/backend/middleware/rate-limit";
import { Validate } from "@/backend/middleware/validate";
import { GenerateAnalysisSchema } from "@/backend/modules/analyzer/analyzer.validators";
import { analyzerController } from "@/backend/modules/analyzer/rest-api/analyzer.controller";

export const analyzerRoutes = Router();

analyzerRoutes.use(RequireAuth);
analyzerRoutes.get("/", AsyncHandler(analyzerController.List));
analyzerRoutes.get("/:id", Validate({ params: IdParamsSchema }), AsyncHandler(analyzerController.Get));
analyzerRoutes.post(
  "/",
  aiLimiter,
  Validate({ body: GenerateAnalysisSchema }),
  AsyncHandler(analyzerController.Generate),
);
