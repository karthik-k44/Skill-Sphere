import js from "@eslint/js";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import importX from "eslint-plugin-import-x";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist", "coverage"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    plugins: { "import-x": importX },
    settings: {
      "import-x/resolver-next": [createTypeScriptImportResolver({ project: "./tsconfig.json" })],
    },
    rules: {
      "import-x/no-cycle": "error",
      "import-x/no-self-import": "error",
      "import-x/no-duplicates": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["src/frontend/**/*.{ts,tsx}"],
    extends: [reactHooks.configs["recommended-latest"], reactRefresh.configs.vite],
    languageOptions: { ecmaVersion: 2022, globals: globals.browser },
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [{ group: ["@/backend/*", "**/backend/**"], message: "The frontend may never import backend code." }] },
      ],
    },
  },
  {
    // Vendored shadcn/ui primitives export variants and hooks alongside components.
    // ...and the router config is data, not a component module, so it is never a fast-refresh boundary.
    files: ["src/frontend/components/ui/**/*.tsx", "src/frontend/config/router.tsx"],
    rules: { "react-refresh/only-export-components": "off" },
  },
  {
    files: ["src/backend/**/*.ts", "*.config.{ts,js}"],
    languageOptions: { ecmaVersion: 2023, globals: globals.node },
  },
]);
