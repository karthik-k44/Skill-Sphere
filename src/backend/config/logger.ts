type LogLevel = "info" | "warn" | "error";

const Write = (level: LogLevel, message: string, meta?: unknown) => {
  if (process.env.NODE_ENV === "test" && level !== "error") return;
  const line = `[${new Date().toISOString()}] ${level.toUpperCase()} ${message}`;
  const sink = level === "error" ? console.error : level === "warn" ? console.warn : console.log;
  if (meta === undefined) sink(line);
  else sink(line, meta);
};

export const logger = {
  info: (message: string, meta?: unknown) => Write("info", message, meta),
  warn: (message: string, meta?: unknown) => Write("warn", message, meta),
  error: (message: string, meta?: unknown) => Write("error", message, meta),
};
