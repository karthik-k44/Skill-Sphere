import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Progress } from "@/frontend/components/ui/progress";
import { FormatRelative } from "@/frontend/utils/format";
import { roadmapService } from "../services";
import type { RoadmapResponseType } from "../types";
import { RoadmapStep } from "./RoadmapStep";

export const RoadmapTimeline = ({ roadmap }: { roadmap: RoadmapResponseType }) => {
  const toggle = roadmapService.useToggleRoadmapItemMutation();
  const doneCount = roadmap.items.filter((item) => item.done).length;
  const totalWeeks = roadmap.items.reduce((sum, item) => sum + item.durationWeeks, 0);

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-xl">{roadmap.targetRole || "Your learning plan"}</CardTitle>
            <CardDescription>
              {roadmap.items.length} steps · about {totalWeeks} weeks · updated {FormatRelative(roadmap.updatedAt)}
            </CardDescription>
          </div>
          <p className="text-sm font-medium tabular-nums">
            {doneCount}/{roadmap.items.length} done
          </p>
        </div>
        <Progress value={roadmap.progress} aria-label="Roadmap progress" />
      </CardHeader>
      <CardContent>
        <ol>
          {roadmap.items.map((item, index) => (
            <RoadmapStep
              key={item.id}
              item={item}
              index={index}
              isLast={index === roadmap.items.length - 1}
              onToggle={(done) => toggle.mutate({ itemId: item.id, done })}
            />
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};
