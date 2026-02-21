import type { NextFunction, Request, Response } from "express";
import { UserType } from "../modules/user/types";
import type { AuthenticatedRequest } from "./auth-middleware";

export const permissionMiddleware = (...allowedRoles: Array<UserType>) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const request = req as AuthenticatedRequest;

  if (!request.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (!allowedRoles.includes(request.user.role)) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to access this resource",
    });
  }

  return next();
};
