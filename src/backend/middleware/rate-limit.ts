import type { Request } from "express";
import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import { env } from "@/backend/config/env";

const Message = (text: string) => ({ message: text, code: "TOO_MANY_REQUESTS" });
const skip = () => env.IS_TEST;

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skip,
  message: Message("Too many sign-in attempts. Please wait a few minutes and try again."),
});

/** Per-user cap on AI calls so one account can't burn through the provider quota. */
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skip,
  keyGenerator: (req: Request) => req.auth?.userId ?? ipKeyGenerator(req.ip ?? ""),
  message: Message("You've reached the hourly limit for AI requests. Please try again later."),
});

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skip,
  message: Message("Too many messages sent. Please try again later."),
});
