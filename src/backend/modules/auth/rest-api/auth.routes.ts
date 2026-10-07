import { Router } from "express";
import { AsyncHandler } from "@/backend/common/utils/async-handler";
import { RequireAuth } from "@/backend/middleware/auth";
import { authLimiter } from "@/backend/middleware/rate-limit";
import { Validate } from "@/backend/middleware/validate";
import { LoginSchema, SignupSchema } from "@/backend/modules/auth/auth.validators";
import { authController } from "@/backend/modules/auth/rest-api/auth.controller";

export const authRoutes = Router();

authRoutes.post("/signup", authLimiter, Validate({ body: SignupSchema }), AsyncHandler(authController.Signup));
authRoutes.post("/login", authLimiter, Validate({ body: LoginSchema }), AsyncHandler(authController.Login));
authRoutes.post("/demo", authLimiter, AsyncHandler(authController.Demo));
authRoutes.post("/refresh", AsyncHandler(authController.Refresh));
authRoutes.post("/logout", AsyncHandler(authController.Logout));
authRoutes.get("/me", RequireAuth, AsyncHandler(authController.Me));
