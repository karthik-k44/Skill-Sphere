import fs from "node:fs";
import path from "node:path";
import express from "express";
import { AttachErrorHandler, CreateApp } from "@/backend/app";
import { env } from "@/backend/config/env";
import { logger } from "@/backend/config/logger";
import { ConnectDb } from "@/backend/db/client";

const DIST_PATH = path.resolve(process.cwd(), "dist");

const MountFrontend = async (app: express.Express) => {
  if (env.IS_PROD) {
    const indexPath = path.join(DIST_PATH, "index.html");
    if (!fs.existsSync(indexPath)) {
      logger.warn("dist/index.html not found - run `npm run build`. Serving the API only.");
      return;
    }
    app.use(express.static(DIST_PATH, { index: false, maxAge: "1y", immutable: true }));
    app.get("*", (_req, res) => res.sendFile(indexPath));
    return;
  }

  // In development Vite runs as middleware, so the API and the SPA share one origin and port.
  const { createServer } = await import("vite");
  const vite = await createServer({ server: { middlewareMode: true }, appType: "spa" });
  app.use(vite.middlewares);
};

const Boot = async () => {
  await ConnectDb();
  const app = CreateApp();
  await MountFrontend(app);
  AttachErrorHandler(app);
  app.listen(env.PORT, () => logger.info(`SkillSphere running on http://localhost:${env.PORT}`));
};

Boot().catch((error: unknown) => {
  logger.error("Failed to start server", error);
  process.exit(1);
});
