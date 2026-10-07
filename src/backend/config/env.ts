import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DBURL: z.string().min(1, "DBURL is required (MongoDB connection string)"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_REFRESH_SECRET: z.string().min(1).optional(),
  /** Comma-separated origins allowed to call the API cross-origin. Unset = same-origin only. */
  CLIENT_ORIGIN: z.string().optional(),
  /** Reverse proxies between the browser and this server: 1 behind Render, 2 when Vercel also proxies /api. */
  TRUST_PROXY_HOPS: z.coerce.number().int().min(0).max(5).default(1),
  AI_ANALYZER_API_KEY: z.string().optional(),
  AI_ANALYZER_API_URL: z.string().optional(),
  AI_ANALYZER_MODEL: z.string().default("gpt-4o-mini"),
  AI_ANALYZER_MAX_TOKENS: z.coerce.number().int().positive().default(1500),
  GITHUB_TOKEN: z.string().optional(),
  DEMO_EMAIL: z.string().email().default("demo@skillsphere.dev"),
  DEMO_PASSWORD: z.string().min(8).default("demo-account-2026"),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`);
  throw new Error(`Invalid environment configuration:\n${issues.join("\n")}`);
}

export const env = {
  ...parsed.data,
  JWT_REFRESH_SECRET: parsed.data.JWT_REFRESH_SECRET ?? `${parsed.data.JWT_SECRET}::refresh`,
  IS_PROD: parsed.data.NODE_ENV === "production",
  IS_TEST: parsed.data.NODE_ENV === "test",
};
