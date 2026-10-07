import { NotFound, TooManyRequests } from "@/backend/common/errors/app-error";
import { aiService } from "@/backend/common/services/ai.service";
import { candidateContextService } from "@/backend/common/services/candidate-context.service";
import { AnalysisModel } from "@/backend/db/schema/analysis.schema";
import { ANALYZER_SYSTEM_PROMPT, BuildAnalysisPrompt } from "@/backend/modules/analyzer/analyzer.prompt";
import { AiAnalysisSchema, type GenerateAnalysisInput } from "@/backend/modules/analyzer/analyzer.validators";
import type {
  AnalysisListResponseType,
  AnalysisResponseType,
  AnalysisSummaryType,
} from "@/backend/types/analysis";

export const ANALYSIS_COOLDOWN_MS = 5 * 60 * 1000;
const HISTORY_LIMIT = 20;

type AnalysisRecord = Omit<AnalysisResponseType, "id" | "createdAt"> & { _id: unknown; createdAt: Date };

const ToAnalysisResponse = (doc: AnalysisRecord): AnalysisResponseType => ({
  id: String(doc._id),
  targetRole: doc.targetRole ?? "",
  overallScore: doc.overallScore,
  scores: doc.scores,
  summary: doc.summary ?? "",
  strengths: doc.strengths ?? [],
  improvements: doc.improvements ?? [],
  resources: doc.resources ?? [],
  model: doc.model ?? "",
  createdAt: new Date(doc.createdAt).toISOString(),
});

const ToSummary = (doc: AnalysisRecord): AnalysisSummaryType => ({
  id: String(doc._id),
  targetRole: doc.targetRole ?? "",
  overallScore: doc.overallScore,
  createdAt: new Date(doc.createdAt).toISOString(),
});

const NextAllowedAt = (latest: { createdAt: Date } | null) => {
  if (!latest) return null;
  const next = new Date(latest.createdAt).getTime() + ANALYSIS_COOLDOWN_MS;
  return next > Date.now() ? new Date(next).toISOString() : null;
};

const List = async (userId: string): Promise<AnalysisListResponseType> => {
  const docs = await AnalysisModel.find({ userId }).sort({ createdAt: -1 }).limit(HISTORY_LIMIT).lean<AnalysisRecord[]>();
  return { items: docs.map(ToSummary), nextAllowedAt: NextAllowedAt(docs[0] ?? null) };
};

const Get = async (userId: string, id: string) => {
  const doc = await AnalysisModel.findOne({ _id: id, userId }).lean<AnalysisRecord>();
  if (!doc) throw NotFound("Analysis not found");
  return ToAnalysisResponse(doc);
};

const Generate = async (userId: string, input: GenerateAnalysisInput) => {
  const latest = await AnalysisModel.findOne({ userId }).sort({ createdAt: -1 }).select("createdAt").lean();
  const nextAllowedAt = NextAllowedAt(latest);
  if (nextAllowedAt) {
    throw TooManyRequests("You can generate a new analysis once every 5 minutes.", { nextAllowedAt });
  }

  const candidate = await candidateContextService.Load(userId);
  const targetRole = input.targetRole || candidate.content.targetRole;
  const { data, model, totalTokens } = await aiService.GenerateJson({
    system: ANALYZER_SYSTEM_PROMPT,
    prompt: BuildAnalysisPrompt(candidate.payload, targetRole),
    schema: AiAnalysisSchema,
    maxTokens: 1800,
  });

  const doc = await AnalysisModel.create({ userId, targetRole, ...data, model, totalTokens });
  return ToAnalysisResponse(doc.toObject() as unknown as AnalysisRecord);
};

export const analyzerService = { List, Get, Generate };
