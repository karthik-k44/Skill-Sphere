import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

// A fake OpenAI client: every test scripts the provider's replies through `create`.
const { create } = vi.hoisted(() => ({ create: vi.fn() }));

vi.mock("openai", () => {
  class BadRequestError extends Error {}
  class RateLimitError extends Error {}
  class Unused extends Error {}
  class OpenAI {
    static BadRequestError = BadRequestError;
    static RateLimitError = RateLimitError;
    static AuthenticationError = Unused;
    static PermissionDeniedError = Unused;
    static NotFoundError = Unused;
    static InternalServerError = Unused;
    chat = { completions: { create } };
  }
  return { default: OpenAI };
});

// setup.ts mocks ai.service for every other test; here we want the real implementation.
const { aiService } = await vi.importActual<typeof import("@/backend/common/services/ai.service")>(
  "@/backend/common/services/ai.service",
);
const OpenAIMock = (await import("openai")).default as unknown as {
  BadRequestError: new (m: string) => Error;
  RateLimitError: new (m: string) => Error;
};

const Reply = (content: string) => ({
  model: "test-model",
  choices: [{ message: { content }, finish_reason: "stop" }],
  usage: { total_tokens: 5 },
});

const request = { system: "sys", prompt: "go", schema: z.object({ ok: z.boolean() }) };

describe("aiService.GenerateJson", () => {
  it("sends the zod schema as a JSON schema and retries once when a reply is malformed", async () => {
    create.mockReset().mockResolvedValueOnce(Reply('{"scores": {"skills": 75} satisfies, "ok": true}')).mockResolvedValueOnce(Reply('{"ok": true}'));

    const result = await aiService.GenerateJson(request);

    expect(result.data).toEqual({ ok: true });
    expect(create).toHaveBeenCalledTimes(2);
    expect(create.mock.calls[0]?.[0].response_format).toMatchObject({
      type: "json_schema",
      json_schema: { schema: { type: "object", properties: { ok: { type: "boolean" } } } },
    });
    expect(JSON.stringify(create.mock.calls[0]?.[0].response_format)).not.toContain("$schema");
  });

  it("gives up with a 502 after two unreadable replies", async () => {
    create.mockReset().mockResolvedValue(Reply("not json at all"));

    await expect(aiService.GenerateJson(request)).rejects.toMatchObject({ status: 502 });
    expect(create).toHaveBeenCalledTimes(2);
  });

  it("steps down from schema mode to JSON mode to prompt-only when a provider rejects them", async () => {
    create
      .mockReset()
      .mockRejectedValueOnce(new OpenAIMock.BadRequestError("Invalid response_format: json_schema"))
      .mockRejectedValueOnce(new OpenAIMock.BadRequestError("Unknown parameter: response_format"))
      .mockResolvedValueOnce(Reply('{"ok": false}'));

    const result = await aiService.GenerateJson(request);

    expect(result.data).toEqual({ ok: false });
    expect(create.mock.calls.map((call) => call[0].response_format?.type)).toEqual(["json_schema", "json_object", undefined]);
  });

  it("explains a provider rate limit as a 429 the user can act on", async () => {
    create.mockReset().mockRejectedValueOnce(new OpenAIMock.RateLimitError("429 status code (no body)"));

    await expect(aiService.GenerateJson(request)).rejects.toMatchObject({
      status: 429,
      message: expect.stringContaining("rate limit"),
    });
  });
});
