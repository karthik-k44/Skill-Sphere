import { NotFound } from "@/backend/common/errors/app-error";
import { aiService } from "@/backend/common/services/ai.service";
import { candidateContextService } from "@/backend/common/services/candidate-context.service";
import { JobMatchModel } from "@/backend/db/schema/job-match.schema";
import { BuildJobMatchPrompt, JOB_MATCH_SYSTEM_PROMPT } from "@/backend/modules/job-match/job-match.prompt";
import { AiJobMatchSchema, type CreateJobMatchInput } from "@/backend/modules/job-match/job-match.validators";
import type { JobMatchResponseType, JobMatchSummaryType } from "@/backend/types/job-match";

const HISTORY_LIMIT = 30;

type JobMatchRecord = Omit<JobMatchResponseType, "id" | "createdAt"> & { _id: unknown; createdAt: Date };

const ToJobMatchResponse = (doc: JobMatchRecord): JobMatchResponseType => ({
  id: String(doc._id),
  jobTitle: doc.jobTitle,
  company: doc.company ?? "",
  jobDescription: doc.jobDescription,
  matchScore: doc.matchScore,
  verdict: doc.verdict ?? "",
  matchedSkills: doc.matchedSkills ?? [],
  missingSkills: doc.missingSkills ?? [],
  tailoredBullets: doc.tailoredBullets ?? [],
  recommendations: doc.recommendations ?? [],
  createdAt: new Date(doc.createdAt).toISOString(),
});

const List = async (userId: string): Promise<JobMatchSummaryType[]> => {
  const docs = await JobMatchModel.find({ userId })
    .sort({ createdAt: -1 })
    .limit(HISTORY_LIMIT)
    .select("jobTitle company matchScore createdAt")
    .lean<JobMatchRecord[]>();
  return docs.map((doc) => ({
    id: String(doc._id),
    jobTitle: doc.jobTitle,
    company: doc.company ?? "",
    matchScore: doc.matchScore,
    createdAt: new Date(doc.createdAt).toISOString(),
  }));
};

const Get = async (userId: string, id: string) => {
  const doc = await JobMatchModel.findOne({ _id: id, userId }).lean<JobMatchRecord>();
  if (!doc) throw NotFound("Job match not found");
  return ToJobMatchResponse(doc);
};

const Create = async (userId: string, input: CreateJobMatchInput) => {
  const candidate = await candidateContextService.Load(userId);
  const { data, model } = await aiService.GenerateJson({
    system: JOB_MATCH_SYSTEM_PROMPT,
    prompt: BuildJobMatchPrompt(candidate.payload, input),
    schema: AiJobMatchSchema,
    maxTokens: 1500,
  });

  const doc = await JobMatchModel.create({ userId, ...input, ...data, model });
  return ToJobMatchResponse(doc.toObject() as unknown as JobMatchRecord);
};

const Remove = async (userId: string, id: string) => {
  const result = await JobMatchModel.deleteOne({ _id: id, userId });
  if (result.deletedCount === 0) throw NotFound("Job match not found");
};

export const jobMatchService = { List, Get, Create, Remove };
