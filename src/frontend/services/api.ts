import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/frontend/config/env";
import { RefreshSession, ReplaceSession } from "@/frontend/services/session-state";
import { GetAccessToken } from "@/frontend/services/token-store";

type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

/** Features never use this directly — go through the verb helpers in request.ts. */
export const httpClient = axios.create({ baseURL: API_BASE_URL, withCredentials: true });

httpClient.interceptors.request.use((config) => {
  const token = GetAccessToken();
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

// Access tokens live 15 minutes. On a 401, refresh once silently and replay the original request.
httpClient.interceptors.response.use(undefined, async (error: AxiosError) => {
  const original = error.config as RetriableConfig | undefined;
  const isAuthCall = original?.url?.startsWith("/auth/") ?? false;

  if (error.response?.status !== 401 || !original || original._retried || isAuthCall) {
    throw error;
  }

  original._retried = true;
  try {
    await RefreshSession();
  } catch {
    ReplaceSession(null);
    throw error;
  }
  return httpClient(original);
});
