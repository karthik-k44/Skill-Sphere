export const ThemeTypeEnum = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;
export type ThemeTypeEnum = (typeof ThemeTypeEnum)[keyof typeof ThemeTypeEnum];

/** App-scope types that don't belong to any one feature. */
export type TAppType = {
  Theme: ThemeTypeEnum;
};
