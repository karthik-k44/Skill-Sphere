import { Router } from "express";
import { AsyncHandler } from "@/backend/common/utils/async-handler";
import { contactLimiter } from "@/backend/middleware/rate-limit";
import { Validate } from "@/backend/middleware/validate";
import { CreateContactMessageSchema } from "@/backend/modules/contact/contact.validators";
import { contactController } from "@/backend/modules/contact/rest-api/contact.controller";

export const contactRoutes = Router();

contactRoutes.post(
  "/",
  contactLimiter,
  Validate({ body: CreateContactMessageSchema }),
  AsyncHandler(contactController.Create),
);
