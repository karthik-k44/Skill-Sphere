import { Router } from "express";
import { AsyncHandler } from "@/backend/common/utils/async-handler";
import { Validate } from "@/backend/middleware/validate";
import { SlugParamsSchema } from "@/backend/modules/profile/profile.validators";
import { publicProfileController } from "@/backend/modules/public-profile/rest-api/public-profile.controller";

export const publicProfileRoutes = Router();

publicProfileRoutes.get(
  "/:slug",
  Validate({ params: SlugParamsSchema }),
  AsyncHandler(publicProfileController.GetBySlug),
);
