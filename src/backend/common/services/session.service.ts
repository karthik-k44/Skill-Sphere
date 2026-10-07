import type { Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "@/backend/config/env";
import { Unauthorized } from "@/backend/common/errors/app-error";
import type { UserRoleTypeEnum } from "@/backend/types/user";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL_DAYS = 7;
export const REFRESH_COOKIE_NAME = "ss_refresh";

type AccessPayload = { sub: string; role: UserRoleTypeEnum; type: "access" };
type RefreshPayload = { sub: string; ver: number; type: "refresh" };

const SESSION_EXPIRED = "Your session has expired. Please sign in again.";

const SignAccessToken = (userId: string, role: UserRoleTypeEnum) =>
  jwt.sign({ sub: userId, role, type: "access" } satisfies AccessPayload, env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });

const SignRefreshToken = (userId: string, tokenVersion: number) =>
  jwt.sign({ sub: userId, ver: tokenVersion, type: "refresh" } satisfies RefreshPayload, env.JWT_REFRESH_SECRET, {
    expiresIn: `${REFRESH_TOKEN_TTL_DAYS}d`,
  });

const VerifyAccessToken = (token: string): AccessPayload => {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AccessPayload;
    if (payload.type !== "access") throw new Error("wrong token type");
    return payload;
  } catch {
    throw Unauthorized(SESSION_EXPIRED);
  }
};

const VerifyRefreshToken = (token: string): RefreshPayload => {
  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshPayload;
    if (payload.type !== "refresh") throw new Error("wrong token type");
    return payload;
  } catch {
    throw Unauthorized(SESSION_EXPIRED);
  }
};

const SetRefreshCookie = (res: Response, token: string) => {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.IS_PROD,
    sameSite: "lax",
    path: "/api/auth",
    maxAge: REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
  });
};

const ClearRefreshCookie = (res: Response) => {
  res.clearCookie(REFRESH_COOKIE_NAME, { path: "/api/auth" });
};

export const sessionService = {
  SignAccessToken,
  SignRefreshToken,
  VerifyAccessToken,
  VerifyRefreshToken,
  SetRefreshCookie,
  ClearRefreshCookie,
};
