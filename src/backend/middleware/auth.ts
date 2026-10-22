import type { NextFunction, Request, Response } from "express";
import { AppError, Forbidden, Unauthorized } from "@/backend/common/errors/app-error";
import { sessionService } from "@/backend/common/services/session.service";
import type { UserRoleTypeEnum } from "@/backend/types/user";

export const RequireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.header("authorization");
  if (!header?.startsWith("Bearer ")) return next(Unauthorized());

  try {
    const payload = sessionService.VerifyAccessToken(header.slice("Bearer ".length).trim());
    req.auth = { userId: payload.sub, role: payload.role, isDemo: Boolean(payload.demo) };
    return next();
  } catch (error) {
    return next(error);
  }
};

export const RequireRole =
  (...roles: UserRoleTypeEnum[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.auth) return next(Unauthorized());
    if (!roles.includes(req.auth.role)) return next(Forbidden());
    return next();
  };

export const DEMO_AI_LOCKED_MESSAGE =
  "AI features are turned off on the demo account, which shows sample results. Create a free account to run them on your own profile.";

/**
 * Keeps the shared demo account away from paid AI calls: anyone can open it, so it would otherwise
 * spend the provider quota. The demo shows seeded sample results instead (db/seed-demo-insights.ts).
 */
export const BlockDemoAccount = (req: Request, _res: Response, next: NextFunction) => {
  if (req.auth?.isDemo) return next(new AppError(403, DEMO_AI_LOCKED_MESSAGE, "DEMO_LOCKED"));
  return next();
};

/** The authenticated user's id. Only valid behind `RequireAuth`. */
export const AuthUserId = (req: Request) => {
  if (!req.auth) throw Unauthorized();
  return req.auth.userId;
};
