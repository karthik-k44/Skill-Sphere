import { z } from "zod";

// Mirrors src/backend/types/job-match.ts.

export type JobMatchResponseType = {
  id: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  matchScore: number;
  verdict: string;
  matchedSkills: string[];
  missingSkills: string[];
  tailoredBullets: string[];
  recommendations: string[];
  createdAt: string;
};

export type JobMatchSummaryType = Pick<JobMatchResponseType, "id" | "jobTitle" | "company" | "matchScore" | "createdAt">;

export const CreateJobMatchSchema = z.object({
  jobTitle: z.string().trim().min(2, "Job title is required").max(120),
  company: z.string().trim().max(120),
  jobDescription: z
    .string()
    .trim()
    .min(80, "Paste the full job description (at least 80 characters)")
    .max(12000, "That's too long — keep it under 12,000 characters"),
});

export type CreateJobMatchInput = z.infer<typeof CreateJobMatchSchema>;

/** Every job-match type under one name — `TJobMatchType["Response"]` etc. */
export type TJobMatchType = {
  Response: JobMatchResponseType;
  Summary: JobMatchSummaryType;
  CreateInput: CreateJobMatchInput;
};
