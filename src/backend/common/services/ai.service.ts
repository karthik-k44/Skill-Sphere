import OpenAI from "openai";
import type { z } from "zod";
import { env } from "@/backend/config/env";
import { logger } from "@/backend/config/logger";
import { AppError, BadGateway, ServiceUnavailable } from "@/backend/common/errors/app-error";

let client: OpenAI | null = null;

const NormalizeBaseUrl = (apiUrl?: string) =>
  apiUrl?.trim() ? apiUrl.replace(/\/chat\/completions\/?$/i, "") : "https://api.aimlapi.com/v1";

const GetClient = () => {
  if (!env.AI_ANALYZER_API_KEY) {
    throw ServiceUnavailable("AI features are not configured on this server (missing AI_ANALYZER_API_KEY).");
  }
  client ??= new OpenAI({ baseURL: NormalizeBaseUrl(env.AI_ANALYZER_API_URL), apiKey: env.AI_ANALYZER_API_KEY });
  return client;
};

/** Pulls the first JSON object out of a model reply, tolerating code fences and stray prose around it. */
const ExtractJson = (raw: string): unknown => {
  const withoutFences = raw.replace(/```(?:json)?/gi, "").trim();
  const start = withoutFences.indexOf("{");
  const end = withoutFences.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("No JSON object in AI reply");
  return JSON.parse(withoutFences.slice(start, end + 1));
};

type GenerateJsonParams<T> = {
  system: string;
  prompt: string;
  schema: z.ZodType<T>;
  maxTokens?: number;
  temperature?: number;
};

const GenerateJson = async <T>({ system, prompt, schema, maxTokens, temperature = 0.4 }: GenerateJsonParams<T>) => {
  let completion: OpenAI.Chat.Completions.ChatCompletion;
  try {
    completion = await GetClient().chat.completions.create({
      model: env.AI_ANALYZER_MODEL,
      messages: [
        { role: "system", content: `${system}\nRespond with a single valid JSON object and nothing else.` },
        { role: "user", content: prompt },
      ],
      temperature,
      max_tokens: Math.max(maxTokens ?? 0, env.AI_ANALYZER_MAX_TOKENS),
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    logger.error("AI provider request failed", error);
    throw BadGateway("The AI provider could not be reached. Please try again in a moment.");
  }

  const content = completion.choices[0]?.message?.content ?? "";
  try {
    const data = schema.parse(ExtractJson(content));
    return { data, model: completion.model, totalTokens: completion.usage?.total_tokens ?? 0 };
  } catch (error) {
    logger.warn("AI reply did not match the expected shape", { error, content: content.slice(0, 500) });
    throw BadGateway("The AI returned an unexpected response. Please try again.");
  }
};

export const aiService = { GenerateJson, ExtractJson };
