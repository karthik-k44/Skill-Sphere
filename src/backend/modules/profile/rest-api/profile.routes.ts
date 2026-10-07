import { Router } from "express";
import { AsyncHandler } from "@/backend/common/utils/async-handler";
import { RequireAuth } from "@/backend/middleware/auth";
import { Validate } from "@/backend/middleware/validate";
import { ProfileInputSchema, PublicSettingsSchema } from "@/backend/modules/profile/profile.validators";
import { profileController } from "@/backend/modules/profile/rest-api/profile.controller";

// Every route is scoped to `/me`: there is no way to address another user's profile through this API.
export const profileRoutes = Router();

profileRoutes.use(RequireAuth);
profileRoutes.get("/me", AsyncHandler(profileController.GetMine));
profileRoutes.put("/me", Validate({ body: ProfileInputSchema }), AsyncHandler(profileController.SaveMine));
profileRoutes.patch(
  "/me/public",
  Validate({ body: PublicSettingsSchema }),
  AsyncHandler(profileController.UpdatePublicSettings),
);
