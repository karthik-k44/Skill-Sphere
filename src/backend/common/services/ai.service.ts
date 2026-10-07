import OpenAI from "openai";
import { z } from "zod";
import { env } from "@/backend/config/env";
import { logger } from "@/backend/config/logger";
import { AppError, BadGateway, ServiceUnavailable, TooManyRequests } from "@/backend/common/errors/app-error";

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

/** zod → JSON Schema for the provider, minus keywords some providers reject (`$schema`, `default`). */
const ToProviderSchema = (schema: z.ZodType): Record<string, unknown> => {
  const strip = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(strip);
    if (typeof node !== "object" || node === null) return node;
    return Object.fromEntries(
      Object.entries(node)
        .filter(([key]) => key !== "$schema" && key !== "default")
        .map(([key, value]) => [key, strip(value)]),
    );
  };
  return strip(z.toJSONSchema(schema, { io: "input", unrepresentable: "any" })) as Record<string, unknown>;
};

/**
 * How strictly we can ask the provider for JSON, best first. Schema mode makes malformed JSON
 * impossible on providers that support it (OpenAI, Gemini); JSON mode makes it rare. If a provider
 * rejects a mode, drop to the next one for the life of the process.
 */
const OUTPUT_MODES = ["json_schema", "json_object", "prompt_only"] as const;
type OutputMode = (typeof OUTPUT_MODES)[number];
let outputMode: OutputMode = "json_schema";

/** Models occasionally emit malformed JSON outside schema mode; one fresh attempt almost always fixes it. */
const MAX_ATTEMPTS = 2;

type CompletionBody = OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming;

const ResponseFormat = (mode: OutputMode, schema: z.ZodType): CompletionBody["response_format"] => {
  if (mode === "json_schema") {
    return { type: "json_schema", json_schema: { name: "response", schema: ToProviderSchema(schema) } };
  }
  return mode === "json_object" ? { type: "json_object" } : undefined;
};

const IsOutputModeRejection = (error: unknown) =>
  error instanceof OpenAI.BadRequestError && /response_format|json|schema/i.test(error.message);

const RequestCompletion = async (body: CompletionBody, schema: z.ZodType): Promise<OpenAI.Chat.Completions.ChatCompletion> => {
  try {
    const responseFormat = ResponseFormat(outputMode, schema);
    return await GetClient().chat.completions.create(responseFormat ? { ...body, response_format: responseFormat } : body);
  } catch (error) {
    if (error instanceof AppError) throw error;
    const next = OUTPUT_MODES[OUTPUT_MODES.indexOf(outputMode) + 1];
    if (next && IsOutputModeRejection(error)) {
      logger.warn(`AI provider rejected "${outputMode}" output; falling back to "${next}"`);
      outputMode = next;
      return RequestCompletion(body, schema);
    }
    throw ToProviderError(error);
  }
};

/** Turns a provider failure into a message that tells the user (or the developer) what to do next. */
const ToProviderError = (error: unknown) => {
  logger.error("AI provider request failed", error instanceof Error ? error.message : error);
  if (error instanceof OpenAI.RateLimitError) {
    return TooManyRequests("The AI provider's rate limit was reached (free tiers allow only a few requests a minute). Wait a minute and try again.");
  }
  if (error instanceof OpenAI.AuthenticationError || error instanceof OpenAI.PermissionDeniedError) {
    return ServiceUnavailable("The AI provider rejected the API key. Check AI_ANALYZER_API_KEY on the server.");
  }
  if (error instanceof OpenAI.NotFoundError) {
    return ServiceUnavailable(`The AI model "${env.AI_ANALYZER_MODEL}" was not found. Check AI_ANALYZER_MODEL on the server.`);
  }
  if (error instanceof OpenAI.InternalServerError) {
    return BadGateway("The AI provider is overloaded right now. Please try again in a minute.");
  }
  return BadGateway("The AI provider could not be reached. Please try again in a moment.");
};

type GenerateJsonParams<T> = {
  system: string;
  prompt: string;
  schema: z.ZodType<T>;
  maxTokens?: number;
  temperature?: number;
};

const GenerateJson = async <T>({ system, prompt, schema, maxTokens, temperature = 0.4 }: GenerateJsonParams<T>) => {
  const body: CompletionBody = {
    model: env.AI_ANALYZER_MODEL,
    messages: [
      { role: "system", content: `${system}\nRespond with a single valid JSON object and nothing else.` },
      { role: "user", content: prompt },
    ],
    temperature,
    max_tokens: Math.max(maxTokens ?? 0, env.AI_ANALYZER_MAX_TOKENS),
  };

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const completion = await RequestCompletion(body, schema);
    const choice = completion.choices[0];
    const content = choice?.message?.content ?? "";

    try {
      const data = schema.parse(ExtractJson(content));
      return { data, model: completion.model, totalTokens: completion.usage?.total_tokens ?? 0 };
    } catch (error) {
      logger.warn(`AI reply did not match the expected shape (attempt ${attempt}/${MAX_ATTEMPTS})`, {
        mode: outputMode,
        hint: choice?.finish_reason === "length" ? "Reply was cut off: raise AI_ANALYZER_MAX_TOKENS" : undefined,
        error: error instanceof Error ? error.message : error,
        content: content.slice(0, 300),
      });
    }
  }

  throw BadGateway("The AI returned an unreadable response twice. Please try again in a moment.");
};

export const aiService = { GenerateJson, ExtractJson };
