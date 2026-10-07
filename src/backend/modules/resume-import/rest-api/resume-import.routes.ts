import { Router } from "express";
import { AsyncHandler } from "@/backend/common/utils/async-handler";
import { RequireAuth } from "@/backend/middleware/auth";
import { aiLimiter } from "@/backend/middleware/rate-limit";
import { resumeImportController } from "@/backend/modules/resume-import/rest-api/resume-import.controller";
import { ResumeUpload } from "@/backend/modules/resume-import/rest-api/resume-import.middleware";

export const resumeImportRoutes = Router();

resumeImportRoutes.post("/", RequireAuth, aiLimiter, ResumeUpload, AsyncHandler(resumeImportController.Parse));
