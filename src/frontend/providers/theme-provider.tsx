import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ReadStorage, WriteStorage } from "@/frontend/lib/storage";
import { ThemeContext } from "@/frontend/providers/theme-context";
import { ThemeTypeEnum } from "@/frontend/types";

const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const SystemTheme = () => (window.matchMedia(DARK_QUERY).matches ? "dark" : "light");

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeTypeEnum>(
    () => ReadStorage<ThemeTypeEnum>(STORAGE_KEY) ?? ThemeTypeEnum.SYSTEM,
  );
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(SystemTheme);

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const onChange = () => setSystemTheme(SystemTheme());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme = theme === ThemeTypeEnum.SYSTEM ? systemTheme : theme;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (next: ThemeTypeEnum) => {
        setThemeState(next);
        WriteStorage(STORAGE_KEY, next);
      },
    }),
    [theme, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
