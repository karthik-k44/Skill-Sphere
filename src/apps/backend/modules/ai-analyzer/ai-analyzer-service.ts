import OpenAI from "openai";
import UserProfileService from "../profile/profile-services";
import type { UserProfile } from "../profile/types";
import AIAnalyzerModel from "./internal/ai-analyzer.schema";
import type { AiAnalyzerResponse } from "./types";
import {
  BuildPromptContent,
  IsUserProfileEmpty,
  NormalizeBaseUrl,
  SplitAIAnalysisMessage,
} from "../../utils/ai-analyzer.utils";

const AI_ANALYZER_COOLDOWN_MS = 5 * 60 * 1000;

type SavedAiAnalyzerRecord = {
  userId: { toString(): string } | string;
  analyzeId: string;
  analyzeMessage?: {
    explanation?: string;
    improvements?: string;
    sources?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export class AIAnalyzerCooldownError extends Error {
  public readonly statusCode = 429;
  public readonly nextAllowedAt: string;

  constructor(nextAllowedAt: Date) {
    super("You can generate a new analysis only once every 5 minutes.");
    this.name = "AIAnalyzerCooldownError";
    this.nextAllowedAt = nextAllowedAt.toISOString();
  }
}

const buildAiAnalyzerResponse = (
  record: SavedAiAnalyzerRecord,
): AiAnalyzerResponse => {
  const updatedAt = record.updatedAt ? new Date(record.updatedAt) : undefined;
  const createdAt = record.createdAt ? new Date(record.createdAt) : undefined;
  const nextAllowedAt = updatedAt
    ? new Date(updatedAt.getTime() + AI_ANALYZER_COOLDOWN_MS)
    : undefined;
  const canGenerate = !nextAllowedAt || nextAllowedAt.getTime() <= Date.now();

  return {
    userId: record.userId.toString(),
    analyzeId: record.analyzeId,
    analyzeMessage: {
      explanation: record.analyzeMessage?.explanation || "",
      improvements: record.analyzeMessage?.improvements || "",
      sources: record.analyzeMessage?.sources || "",
    },
    createdAt: createdAt?.toISOString(),
    updatedAt: updatedAt?.toISOString(),
    nextAllowedAt: nextAllowedAt?.toISOString(),
    canGenerate,
  };
};

export default class AIAnalyzerService {
  public static async GetAIGeneratedInsights(
    userId: string,
  ): Promise<AiAnalyzerResponse | null> {
    if (!userId) {
      throw new Error("User ID not found");
    }

    const response = await AIAnalyzerModel.findOne({ userId });

    if (!response) {
      return null;
    }

    return buildAiAnalyzerResponse(
      response.toObject() as unknown as SavedAiAnalyzerRecord,
    );
  }

  public static async CreateAIGeneratedInsights(
    userId: string,
  ): Promise<AiAnalyzerResponse> {
    const userProfile = (await UserProfileService.getUserProfile(
      userId,
    )) as UserProfile;

    if (IsUserProfileEmpty(userProfile)) {
      throw new Error("User profile is empty");
    }

    const existingAnalysis = await AIAnalyzerModel.findOne({ userId });
    const lastUpdatedAt = existingAnalysis?.updatedAt
      ? new Date(existingAnalysis.updatedAt)
      : undefined;
    const nextAllowedAt = lastUpdatedAt
      ? new Date(lastUpdatedAt.getTime() + AI_ANALYZER_COOLDOWN_MS)
      : undefined;

    if (nextAllowedAt && nextAllowedAt.getTime() > Date.now()) {
      throw new AIAnalyzerCooldownError(nextAllowedAt);
    }

    const apiKey = process.env.AI_ANALYZER_API_KEY;
    if (!apiKey) {
      throw new Error("AI_ANALYZER_API_KEY is not configured");
    }

    const model = process.env.AI_ANALYZER_MODEL || "gpt-4o-mini";
    const maxTokens = Number(process.env.AI_ANALYZER_MAX_TOKENS) || 500;

    const client = new OpenAI({
      baseURL: NormalizeBaseUrl(process.env.AI_ANALYZER_API_URL),
      apiKey,
    });

    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content: BuildPromptContent(userProfile),
        },
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
    });

    const responseContent = completion.choices[0]?.message?.content;
    const analysis =
      typeof responseContent === "string"
        ? SplitAIAnalysisMessage(responseContent).cleanedMessage
        : "";

    if (!analysis) {
      throw new Error("No analysis received from AI provider");
    }

    const parsedAnalysis = SplitAIAnalysisMessage(analysis);

    let result;
    if (existingAnalysis) {
     result = await AIAnalyzerModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          analyzeId: completion.id,
          analyzeMessage: {
            explanation: parsedAnalysis.explanation,
            improvements: parsedAnalysis.improvements,
            sources: parsedAnalysis.sources,
          },
          metadata: {
            model: completion.model,
            usage: completion.usage,
            total_tokens: completion.usage?.total_tokens,
            prompt_tokens: completion.usage?.prompt_tokens,
            completion_tokens: completion.usage?.completion_tokens,
          },
        },
      },
      {
        new: true,
      },
    );
    } else {
       result = await AIAnalyzerModel.create({
        userId,
        analyzeId: completion.id,
        analyzeMessage: {
          explanation: parsedAnalysis.explanation,
          improvements: parsedAnalysis.improvements,
          sources: parsedAnalysis.sources,
        },
        metadata: {
          model: completion.model,
          usage: completion.usage,
          total_tokens: completion.usage?.total_tokens,
          prompt_tokens: completion.usage?.prompt_tokens,
          completion_tokens: completion.usage?.completion_tokens,
        },
      })
    }

    if (!result) {
      throw new Error("Failed to save or update AI analysis");
    }

    return buildAiAnalyzerResponse(
      result.toObject() as unknown as SavedAiAnalyzerRecord,
    );
  }
}
