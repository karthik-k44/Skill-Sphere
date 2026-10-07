import type { UserRoleTypeEnum } from "@/backend/types/user";

declare global {
  namespace Express {
    interface Request {
      /** Set by `RequireAuth` from a verified access token. */
      auth?: { userId: string; role: UserRoleTypeEnum };
    }
  }
}

export {};
