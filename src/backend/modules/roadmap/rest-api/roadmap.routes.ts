import { Router } from "express";
import { AsyncHandler } from "@/backend/common/utils/async-handler";
import { RequireAuth } from "@/backend/middleware/auth";
import { aiLimiter } from "@/backend/middleware/rate-limit";
import { Validate } from "@/backend/middleware/validate";
import {
  GenerateRoadmapSchema,
  RoadmapItemParamsSchema,
  UpdateRoadmapItemSchema,
} from "@/backend/modules/roadmap/roadmap.validators";
import { roadmapController } from "@/backend/modules/roadmap/rest-api/roadmap.controller";

export const roadmapRoutes = Router();

roadmapRoutes.use(RequireAuth);
roadmapRoutes.get("/", AsyncHandler(roadmapController.GetMine));
roadmapRoutes.post(
  "/generate",
  aiLimiter,
  Validate({ body: GenerateRoadmapSchema }),
  AsyncHandler(roadmapController.Generate),
);
roadmapRoutes.patch(
  "/items/:itemId",
  Validate({ params: RoadmapItemParamsSchema, body: UpdateRoadmapItemSchema }),
  AsyncHandler(roadmapController.SetItemDone),
);
