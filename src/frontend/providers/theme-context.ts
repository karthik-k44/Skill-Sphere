import { createContext } from "react";
import type { ThemeTypeEnum } from "@/frontend/types";

export type ThemeContextValue = {
  /** What the user picked (may be "system"). */
  theme: ThemeTypeEnum;
  /** What is actually applied right now. */
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemeTypeEnum) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
