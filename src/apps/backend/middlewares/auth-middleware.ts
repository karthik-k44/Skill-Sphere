import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUserModel } from "../modules/user/internal/authentication-schema";
import type { AuthTokenPayload } from "../utils/auth-token.util";
import { UserType } from "../modules/user/types";

export type AuthenticatedUser = {
  userId: string;
  email: string;
  role: UserType;
  name: string;
};

export type AuthenticatedRequest = Request & {
  user?: AuthenticatedUser;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token is required",
    });
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({
      success: false,
      message: "JWT_SECRET is not configured",
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as AuthTokenPayload;
    const user = await createUserModel
      .findById(decoded.userId)
      .select("_id name email role");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    (req as AuthenticatedRequest).user = {
      userId: String(user._id),
      email: String(user.email),
      role: (user.role as UserType) || UserType.USER,
      name: String(user.name),
    };

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
