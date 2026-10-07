import axios from "axios";
import { API_BASE_URL } from "@/frontend/config/env";
import { queryClient } from "@/frontend/lib/query-client";
import { ClearAccessToken, SetAccessToken } from "@/frontend/services/token-store";
import type { SessionType, SessionUserType } from "@/frontend/services/type";

/** Query key holding the signed-in user (or null). */
export const sessionKey = ["session"] as const;

// A bare client: refreshing must not run through the 401-retry interceptor in api.ts.
const authClient = axios.create({ baseURL: API_BASE_URL, withCredentials: true });

export const ReplaceSession = (session: SessionType | null) => {
  if (session) SetAccessToken(session.accessToken);
  else ClearAccessToken();
  queryClient.setQueryData<SessionUserType | null>(sessionKey, session?.user ?? null);
};

let inFlightRefresh: Promise<SessionType> | null = null;

/**
 * Trades the httpOnly refresh cookie for a new access token. Concurrent callers share one request.
 * Rejects when there is no session (the server answers 204 when no cookie was sent).
 */
export const RefreshSession = () => {
  inFlightRefresh ??= authClient
    .post<SessionType | "">("/auth/refresh")
    .then((response) => {
      if (!response.data) {
        ReplaceSession(null);
        throw new Error("No active session");
      }
      ReplaceSession(response.data);
      return response.data;
    })
    .finally(() => {
      inFlightRefresh = null;
    });
  return inFlightRefresh;
};
