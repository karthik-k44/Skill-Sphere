import { z } from "zod";
import { AiScore, AiText, AiTextList } from "@/backend/common/utils/ai-schema";
import { ImprovementPriorityTypeEnum, LearningResourceTypeEnum } from "@/backend/types/analysis";

export const GenerateAnalysisSchema = z.object({
  targetRole: z.string().trim().max(100).default(""),
});

/** Shape the model must return. Lenient on purpose — see common/utils/ai-schema.ts. */
export const AiAnalysisSchema = z.object({
  overallScore: AiScore,
  scores: z.object({
    skills: AiScore,
    experience: AiScore,
    projects: AiScore,
    education: AiScore,
    presentation: AiScore,
  }),
  summary: AiText,
  strengths: AiTextList,
  improvements: z
    .array(
      z.object({
        title: AiText,
        detail: AiText,
        priority: z.enum(Object.values(ImprovementPriorityTypeEnum)).catch(ImprovementPriorityTypeEnum.MEDIUM),
      }),
    )
    .catch([]),
  resources: z
    .array(
      z.object({
        title: AiText,
        type: z.enum(Object.values(LearningResourceTypeEnum)).catch(LearningResourceTypeEnum.DOCS),
        url: AiText,
        reason: AiText,
      }),
    )
    .catch([]),
});

export type GenerateAnalysisInput = z.infer<typeof GenerateAnalysisSchema>;
export type AiAnalysis = z.infer<typeof AiAnalysisSchema>;
