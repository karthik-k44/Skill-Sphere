const configuredBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim().replace(/\/$/, "") ?? "";

/** Same-origin by default: in dev Express serves Vite, in prod it serves dist/. */
export const API_BASE_URL = `${configuredBase}/api`;
