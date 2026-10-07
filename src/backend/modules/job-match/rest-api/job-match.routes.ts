import { Router } from "express";
import { AsyncHandler } from "@/backend/common/utils/async-handler";
import { IdParamsSchema } from "@/backend/common/utils/object-id";
import { RequireAuth } from "@/backend/middleware/auth";
import { aiLimiter } from "@/backend/middleware/rate-limit";
import { Validate } from "@/backend/middleware/validate";
import { CreateJobMatchSchema } from "@/backend/modules/job-match/job-match.validators";
import { jobMatchController } from "@/backend/modules/job-match/rest-api/job-match.controller";

export const jobMatchRoutes = Router();

jobMatchRoutes.use(RequireAuth);
jobMatchRoutes.get("/", AsyncHandler(jobMatchController.List));
jobMatchRoutes.get("/:id", Validate({ params: IdParamsSchema }), AsyncHandler(jobMatchController.Get));
jobMatchRoutes.post("/", aiLimiter, Validate({ body: CreateJobMatchSchema }), AsyncHandler(jobMatchController.Create));
jobMatchRoutes.delete("/:id", Validate({ params: IdParamsSchema }), AsyncHandler(jobMatchController.Remove));
