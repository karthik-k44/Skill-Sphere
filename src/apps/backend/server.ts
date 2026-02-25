import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDb from "./database/db";
import authenticationRouter from "./modules/user/rest-api/authentication-router";
import userProfileRouter from "./modules/profile/res-api/profile-routers";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === "production";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/api/auth", authenticationRouter);
app.use("/api/user-profile", userProfileRouter);

const serverBoot = async () => {
  if (process.env.DBURL) {
    await connectDb();
  } else {
    console.warn("DBURL is not set starting server without database connection.");
  }

  if (isProd) {
    const distPath = path.resolve(__dirname, "../../../dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: {
        middlewareMode: true,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

serverBoot().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
