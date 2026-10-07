import type { Request, Response } from "express";
import { REFRESH_COOKIE_NAME, sessionService } from "@/backend/common/services/session.service";
import { AuthUserId } from "@/backend/middleware/auth";
import { authService } from "@/backend/modules/auth/auth.service";
import type { SessionResponseType } from "@/backend/types/user";

type IssuedSession = Awaited<ReturnType<typeof authService.Login>>;

const SendSession = (res: Response, session: IssuedSession, status = 200) => {
  sessionService.SetRefreshCookie(res, session.refreshToken);
  res.status(status).json({ accessToken: session.accessToken, user: session.user } satisfies SessionResponseType);
};

const ReadRefreshCookie = (req: Request): string | undefined => req.cookies?.[REFRESH_COOKIE_NAME];

export const authController = {
  Signup: async (req: Request, res: Response) => SendSession(res, await authService.Signup(req.body), 201),
  Login: async (req: Request, res: Response) => SendSession(res, await authService.Login(req.body)),
  Demo: async (_req: Request, res: Response) => SendSession(res, await authService.DemoLogin()),
  Refresh: async (req: Request, res: Response) => {
    const refreshToken = ReadRefreshCookie(req);
    // A visitor who never signed in is not an error: answer "no session" without a 401 in their console.
    if (!refreshToken) return void res.status(204).end();
    SendSession(res, await authService.Refresh(refreshToken));
  },
  Logout: async (req: Request, res: Response) => {
    await authService.Logout(ReadRefreshCookie(req));
    sessionService.ClearRefreshCookie(res);
    res.status(204).end();
  },
  Me: async (req: Request, res: Response) => {
    res.json(await authService.GetMe(AuthUserId(req)));
  },
};
