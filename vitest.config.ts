import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["src/backend/tests/**/*.test.ts"],
    setupFiles: ["src/backend/tests/setup.ts"],
    // Parsed by config/env.ts at import time, so they must exist before any test module loads.
    env: {
      NODE_ENV: "test",
      DBURL: "mongodb://127.0.0.1:1/replaced-by-memory-server",
      JWT_SECRET: "test-access-secret-0123456789",
      JWT_REFRESH_SECRET: "test-refresh-secret-0123456789",
      AI_ANALYZER_API_KEY: "test-key",
      DEMO_EMAIL: "demo@test.dev",
      DEMO_PASSWORD: "demo-password-123",
    },
    hookTimeout: 180_000,
    testTimeout: 30_000,
    fileParallelism: false,
  },
});
