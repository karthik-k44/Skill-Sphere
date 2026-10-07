import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { AppError } from "@/backend/common/errors/app-error";
import { logger } from "@/backend/config/logger";

type ApiErrorBody = { message: string; code: string; details?: unknown };

const IsDuplicateKey = (error: unknown) =>
  typeof error === "object" && error !== null && (error as { code?: number }).code === 11000;

const Send = (res: Response, status: number, body: ApiErrorBody) => res.status(status).json(body);

export const NotFoundHandler = (req: Request, res: Response) => {
  Send(res, 404, { message: `No route for ${req.method} ${req.originalUrl}`, code: "NOT_FOUND" });
};

export const ErrorHandler = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(error);

  if (error instanceof AppError) {
    return Send(res, error.status, { message: error.message, code: error.code, details: error.details });
  }
  if (error instanceof multer.MulterError) {
    const message = error.code === "LIMIT_FILE_SIZE" ? "File is too large (max 5 MB)." : error.message;
    return Send(res, 400, { message, code: "BAD_REQUEST" });
  }
  if (error instanceof SyntaxError && "body" in error) {
    return Send(res, 400, { message: "Malformed JSON body", code: "BAD_REQUEST" });
  }
  if (IsDuplicateKey(error)) {
    return Send(res, 409, { message: "That value is already taken", code: "CONFLICT" });
  }

  logger.error("Unhandled error", error);
  return Send(res, 500, { message: "Something went wrong on our side", code: "INTERNAL" });
};
