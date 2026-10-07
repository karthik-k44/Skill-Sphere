import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Router } from "express";
import helmet from "helmet";
import { env } from "@/backend/config/env";
import { ErrorHandler, NotFoundHandler } from "@/backend/middleware/error-handler";
import { analyzerRoutes } from "@/backend/modules/analyzer/rest-api/analyzer.routes";
import { authRoutes } from "@/backend/modules/auth/rest-api/auth.routes";
import { contactRoutes } from "@/backend/modules/contact/rest-api/contact.routes";
import { githubRoutes } from "@/backend/modules/github/rest-api/github.routes";
import { jobMatchRoutes } from "@/backend/modules/job-match/rest-api/job-match.routes";
import { profileRoutes } from "@/backend/modules/profile/rest-api/profile.routes";
import { publicProfileRoutes } from "@/backend/modules/public-profile/rest-api/public-profile.routes";
import { resumeImportRoutes } from "@/backend/modules/resume-import/rest-api/resume-import.routes";
import { roadmapRoutes } from "@/backend/modules/roadmap/rest-api/roadmap.routes";

const ContentSecurityPolicy = {
  directives: {
    defaultSrc: ["'self'"],
    // react-pdf lays out documents with a WebAssembly build of yoga.
    scriptSrc: ["'self'", "'wasm-unsafe-eval'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
    imgSrc: ["'self'", "data:", "blob:", "https://avatars.githubusercontent.com"],
    connectSrc: ["'self'", "blob:", "data:"],
    frameSrc: ["'self'", "blob:"],
    workerSrc: ["'self'", "blob:"],
  },
};

const BuildApiRouter = () => {
  const api = Router();
  api.get("/health", (_req, res) => {
    res.json({ status: "ok", commit: env.RENDER_GIT_COMMIT ?? null });
  });
  api.use("/auth", authRoutes);
  api.use("/profile", profileRoutes);
  api.use("/public/profiles", publicProfileRoutes);
  api.use("/analyses", analyzerRoutes);
  api.use("/job-matches", jobMatchRoutes);
  api.use("/roadmap", roadmapRoutes);
  api.use("/resume-import", resumeImportRoutes);
  api.use("/github", githubRoutes);
  api.use("/contact", contactRoutes);
  api.use(NotFoundHandler);
  return api;
};

/** Builds the API app. The SPA (Vite in dev, dist/ in prod) is mounted by server.ts, not here. */
export const CreateApp = () => {
  const app = express();
  const allowedOrigins = env.CLIENT_ORIGIN?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? [];

  // Proxies in front of the app (Render = 1; Vercel rewrite -> Render = 2). Must be right, or rate limits key on the proxy's IP.
  app.set("trust proxy", env.TRUST_PROXY_HOPS);
  app.use(helmet({ contentSecurityPolicy: env.IS_PROD ? ContentSecurityPolicy : false }));
  if (allowedOrigins.length > 0) app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));
  app.use("/api", BuildApiRouter());
  return app;
};

/** Registered last so SPA routes resolve before it. */
export const AttachErrorHandler = (app: express.Express) => {
  app.use(ErrorHandler);
};
