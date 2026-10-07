import { Link } from "react-router-dom";
import { ArrowRight, Map } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Progress } from "@/frontend/components/ui/progress";
import { paths } from "@/frontend/config/paths";
import type { RoadmapResponseType } from "@/frontend/features/roadmap/types";

export const RoadmapProgressCard = ({ roadmap }: { roadmap: RoadmapResponseType | null | undefined }) => {
  const nextStep = roadmap?.items.find((item) => !item.done);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="size-4 text-primary" /> Learning roadmap
        </CardTitle>
        {roadmap && <CardDescription>{roadmap.targetRole || "Your plan"}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {!roadmap ? (
          <>
            <p className="text-sm text-muted-foreground">Turn your skill gaps into a step-by-step plan.</p>
            <Button variant="outline" asChild>
              <Link to={paths.app.roadmap}>Create roadmap</Link>
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium tabular-nums">{roadmap.progress}%</span>
              </div>
              <Progress value={roadmap.progress} aria-label="Roadmap progress" />
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {nextStep ? "Up next" : "All steps complete"}
              </p>
              <p className="font-medium">{nextStep?.title ?? "Great work — generate a new plan for your next goal."}</p>
            </div>
            <Button variant="link" className="h-auto px-0" asChild>
              <Link to={paths.app.roadmap}>
                Open roadmap <ArrowRight />
              </Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
