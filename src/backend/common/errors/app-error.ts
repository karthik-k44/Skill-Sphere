/** An error that maps directly onto an HTTP response. Thrown by services, rendered by the error handler. */
export class AppError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(status: number, message: string, code: string, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const BadRequest = (message: string, details?: unknown) =>
  new AppError(400, message, "BAD_REQUEST", details);
export const Unauthorized = (message = "Authentication required") =>
  new AppError(401, message, "UNAUTHORIZED");
export const Forbidden = (message = "You do not have permission to do that") =>
  new AppError(403, message, "FORBIDDEN");
export const NotFound = (message = "Not found") => new AppError(404, message, "NOT_FOUND");
export const Conflict = (message: string) => new AppError(409, message, "CONFLICT");
export const TooManyRequests = (message: string, details?: unknown) =>
  new AppError(429, message, "TOO_MANY_REQUESTS", details);
export const BadGateway = (message: string) => new AppError(502, message, "BAD_GATEWAY");
export const ServiceUnavailable = (message: string) =>
  new AppError(503, message, "SERVICE_UNAVAILABLE");
