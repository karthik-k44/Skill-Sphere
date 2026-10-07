import { z } from "zod";

// Lenient zod building blocks for model output: models drift on types, so coerce and clamp rather than fail.

export const AiScore = z.coerce
  .number()
  .catch(0)
  .transform((value) => Math.round(Math.max(0, Math.min(100, value))));

export const AiText = z.coerce
  .string()
  .catch("")
  .transform((value) => value.trim());

export const AiTextList = z
  .array(AiText)
  .catch([])
  .transform((items) => items.filter(Boolean));
