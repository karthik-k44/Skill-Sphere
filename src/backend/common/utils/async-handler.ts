import type { NextFunction, Request, RequestHandler, Response } from "express";

/** Express 4 does not forward rejected promises to the error handler; this does. */
export const AsyncHandler =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) => {
    handler(req, res, next).catch(next);
  };
