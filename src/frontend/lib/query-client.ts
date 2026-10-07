import { QueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/frontend/services/api-error";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiError;
  }
}

/** Client errors (4xx) won't change on retry; only retry network and server failures. */
const ShouldRetry = (failureCount: number, error: ApiError) =>
  failureCount < 2 && (error.status === 0 || error.status >= 500);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: ShouldRetry,
    },
    mutations: { retry: false },
  },
});
