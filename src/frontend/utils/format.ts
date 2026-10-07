const ToDate = (value?: string | Date | null) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

/** "Jan 2024" */
export const FormatMonthYear = (value?: string | Date | null) =>
  ToDate(value)?.toLocaleDateString("en-US", { month: "short", year: "numeric" }) ?? "";

/** "Jan 2024 – Present" */
export const FormatDateRange = (start?: string | null, end?: string | null, isCurrent = false) => {
  const from = FormatMonthYear(start);
  const to = isCurrent ? "Present" : FormatMonthYear(end);
  return [from, to].filter(Boolean).join(" – ");
};

export const FormatDateTime = (value?: string | null) =>
  ToDate(value)?.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }) ?? "—";

/** "3 days ago", falling back to a date after a month. */
export const FormatRelative = (value?: string | null) => {
  const date = ToDate(value);
  if (!date) return "—";
  const minutes = Math.round((Date.now() - date.getTime()) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return FormatMonthYear(date);
};

export const GetDurationInMonths = (start?: string | null, end?: string | null, isCurrent = false) => {
  const from = ToDate(start);
  const to = isCurrent ? new Date() : ToDate(end);
  if (!from || !to) return 0;
  return Math.max((to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()), 0);
};

/** 26 → "2y 2m" */
export const FormatDuration = (months: number) => {
  if (months <= 0) return "0m";
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years && rest) return `${years}y ${rest}m`;
  return years ? `${years}y` : `${rest}m`;
};

/** 125000 ms → "2:05" */
export const FormatCountdown = (milliseconds: number) => {
  const totalSeconds = Math.max(Math.ceil(milliseconds / 1000), 0);
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
};

export const Initials = (name?: string) =>
  (name ?? "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

/** Score bands shared by every 0-100 score in the app. */
export const ScoreTone = (score: number) => {
  if (score >= 75) return { label: "Strong", className: "text-success" };
  if (score >= 50) return { label: "Developing", className: "text-warning" };
  return { label: "Needs work", className: "text-destructive" };
};
