import axios from "axios";
import type { ApiErrorBody } from "@/frontend/services/type";

type FieldError = { path: string; message: string };

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(status: number, message: string, code: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  /** Per-field messages from a 400 validation response, keyed by dotted path. */
  get fieldErrors(): Record<string, string> {
    const fields = (this.details as { fields?: FieldError[] } | undefined)?.fields ?? [];
    return Object.fromEntries(fields.map((field) => [field.path, field.message]));
  }
}

export const IsCanceled = (error: unknown) => axios.isCancel(error);

/** Normalises anything thrown by a request into an `ApiError` the UI can display. */
export const ToApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error;

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return new ApiError(0, "Can't reach the server. Check your connection and try again.", "NETWORK");
    }
    const body = error.response.data as Partial<ApiErrorBody> | undefined;
    return new ApiError(
      error.response.status,
      body?.message ?? "Something went wrong. Please try again.",
      body?.code ?? "UNKNOWN",
      body?.details,
    );
  }

  return new ApiError(0, error instanceof Error ? error.message : "Unexpected error", "UNKNOWN");
};
