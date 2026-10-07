import { z } from "zod";
import { AiScore, AiText, AiTextList } from "@/backend/common/utils/ai-schema";

export const CreateJobMatchSchema = z.object({
  jobTitle: z.string().trim().min(2, "Job title is required").max(120),
  company: z.string().trim().max(120).default(""),
  jobDescription: z
    .string()
    .trim()
    .min(80, "Paste the full job description (at least 80 characters)")
    .max(12000, "Job description is too long (max 12,000 characters)"),
});

export const AiJobMatchSchema = z.object({
  matchScore: AiScore,
  verdict: AiText,
  matchedSkills: AiTextList,
  missingSkills: AiTextList,
  tailoredBullets: AiTextList,
  recommendations: AiTextList,
});

export type CreateJobMatchInput = z.infer<typeof CreateJobMatchSchema>;
