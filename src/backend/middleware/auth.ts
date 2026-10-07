import type { NextFunction, Request, Response } from "express";
import { Forbidden, Unauthorized } from "@/backend/common/errors/app-error";
import { sessionService } from "@/backend/common/services/session.service";
import type { UserRoleTypeEnum } from "@/backend/types/user";

export const RequireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.header("authorization");
  if (!header?.startsWith("Bearer ")) return next(Unauthorized());

  try {
    const payload = sessionService.VerifyAccessToken(header.slice("Bearer ".length).trim());
    req.auth = { userId: payload.sub, role: payload.role };
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

/** The authenticated user's id. Only valid behind `RequireAuth`. */
export const AuthUserId = (req: Request) => {
  if (!req.auth) throw Unauthorized();
  return req.auth.userId;
};
