import { NotFound } from "@/backend/common/errors/app-error";
import { aiService } from "@/backend/common/services/ai.service";
import { candidateContextService } from "@/backend/common/services/candidate-context.service";
import { AnalysisModel } from "@/backend/db/schema/analysis.schema";
import { RoadmapModel } from "@/backend/db/schema/roadmap.schema";
import { BuildRoadmapPrompt, ROADMAP_SYSTEM_PROMPT } from "@/backend/modules/roadmap/roadmap.prompt";
import { AiRoadmapSchema, type GenerateRoadmapInput } from "@/backend/modules/roadmap/roadmap.validators";
import type { RoadmapItemType, RoadmapResponseType } from "@/backend/types/roadmap";

type RoadmapRecord = {
  _id: unknown;
  targetRole?: string | null;
  items: (Omit<RoadmapItemType, "id" | "completedAt"> & { _id: unknown; completedAt?: Date | null })[];
  createdAt: Date;
  updatedAt: Date;
};

const ToRoadmapResponse = (doc: RoadmapRecord): RoadmapResponseType => {
  const items = doc.items.map((item) => ({
    id: String(item._id),
    title: item.title,
    description: item.description ?? "",
    skill: item.skill ?? "",
    durationWeeks: item.durationWeeks ?? 1,
    resources: item.resources ?? [],
    done: Boolean(item.done),
    completedAt: item.completedAt ? new Date(item.completedAt).toISOString() : null,
  }));
  const doneCount = items.filter((item) => item.done).length;

  return {
    id: String(doc._id),
    targetRole: doc.targetRole ?? "",
    items,
    progress: items.length ? Math.round((doneCount / items.length) * 100) : 0,
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  };
};

const GetMine = async (userId: string) => {
  const doc = await RoadmapModel.findOne({ userId }).lean<RoadmapRecord>();
  return doc ? ToRoadmapResponse(doc) : null;
};

/** Generates a fresh plan and replaces the previous one (one roadmap per user). */
const Generate = async (userId: string, input: GenerateRoadmapInput) => {
  const candidate = await candidateContextService.Load(userId);
  const targetRole = input.targetRole || candidate.content.targetRole;

  const latestAnalysis = input.useLatestAnalysis
    ? await AnalysisModel.findOne({ userId }).sort({ createdAt: -1 }).select("improvements").lean()
    : null;
  const focusAreas = (latestAnalysis?.improvements ?? []).map((item) => ({
    title: item.title ?? "",
    detail: item.detail ?? "",
  }));

  const { data } = await aiService.GenerateJson({
    system: ROADMAP_SYSTEM_PROMPT,
    prompt: BuildRoadmapPrompt(candidate.payload, targetRole, focusAreas),
    schema: AiRoadmapSchema,
    maxTokens: 1600,
  });

  const doc = await RoadmapModel.findOneAndUpdate(
    { userId },
    { $set: { targetRole, items: data.items } },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
  ).lean<RoadmapRecord>();
  if (!doc) throw NotFound("Roadmap not found");
  return ToRoadmapResponse(doc);
};

const SetItemDone = async (userId: string, itemId: string, done: boolean) => {
  const roadmap = await RoadmapModel.findOne({ userId });
  const item = roadmap?.items.id(itemId);
  if (!roadmap || !item) throw NotFound("Roadmap step not found");

  item.done = done;
  item.completedAt = done ? new Date() : null;
  await roadmap.save();
  return ToRoadmapResponse(roadmap.toObject() as unknown as RoadmapRecord);
};

export const roadmapService = { GetMine, Generate, SetItemDone };
