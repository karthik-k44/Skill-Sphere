import { Router } from "express";
import { AsyncHandler } from "@/backend/common/utils/async-handler";
import { RequireAuth } from "@/backend/middleware/auth";
import { Validate } from "@/backend/middleware/validate";
import { GithubUsernameParamsSchema } from "@/backend/modules/github/github.validators";
import { githubController } from "@/backend/modules/github/rest-api/github.controller";

export const githubRoutes = Router();

githubRoutes.get(
  "/users/:username/repos",
  RequireAuth,
  Validate({ params: GithubUsernameParamsSchema }),
  AsyncHandler(githubController.ImportUser),
);
