import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";
import { BadRequest } from "@/backend/common/errors/app-error";

type Schemas = { body?: z.ZodType; params?: z.ZodType; query?: z.ZodType };

/** Parses body/params/query with zod and replaces them with the parsed (trimmed, coerced) values. */
export const Validate = (schemas: Schemas) => (req: Request, _res: Response, next: NextFunction) => {
  for (const key of ["body", "params", "query"] as const) {
    const schema = schemas[key];
    if (!schema) continue;

    const result = schema.safeParse(req[key]);
    if (!result.success) {
      const fields = result.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message }));
      return next(BadRequest(fields[0]?.message ?? "Invalid request", { fields }));
    }

    if (key === "query") Object.defineProperty(req, "query", { value: result.data, writable: true });
    else req[key] = result.data;
  }
  return next();
};
