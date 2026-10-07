import { z } from "zod";
import { AiText } from "@/backend/common/utils/ai-schema";
import { ObjectIdSchema } from "@/backend/common/utils/object-id";

export const GenerateRoadmapSchema = z.object({
  targetRole: z.string().trim().max(100).default(""),
  /** When true, the latest analyzer improvements steer the plan. */
  useLatestAnalysis: z.boolean().default(true),
});

export const UpdateRoadmapItemSchema = z.object({ done: z.boolean() });
export const RoadmapItemParamsSchema = z.object({ itemId: ObjectIdSchema });

export const AiRoadmapSchema = z.object({
  items: z
    .array(
      z.object({
        title: AiText,
        description: AiText,
        skill: AiText,
        durationWeeks: z.coerce
          .number()
          .catch(2)
          .transform((weeks) => Math.max(1, Math.min(12, Math.round(weeks)))),
        resources: z.array(z.object({ title: AiText, url: AiText })).catch([]),
      }),
    )
    .min(1)
    .transform((items) => items.filter((item) => item.title).slice(0, 10)),
});

export type GenerateRoadmapInput = z.infer<typeof GenerateRoadmapSchema>;
