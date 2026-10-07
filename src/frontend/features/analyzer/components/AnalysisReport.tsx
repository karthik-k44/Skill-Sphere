import { Link } from "react-router-dom";
import { Map } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Skeleton } from "@/frontend/components/ui/skeleton";
import { ErrorState } from "@/frontend/components/feedback/ErrorState";
import { paths } from "@/frontend/config/paths";
import { analyzerService } from "../services";
import { ImprovementsCard } from "./ImprovementsCard";
import { ResourcesCard } from "./ResourcesCard";
import { ScoreOverviewCard } from "./ScoreOverviewCard";
import { StrengthsCard } from "./StrengthsCard";

export const AnalysisReport = ({ id }: { id: string }) => {
  const { data: analysis, isPending, error, refetch } = analyzerService.useAnalysis(id);

  if (isPending) return <Skeleton className="h-96 w-full rounded-xl" />;
  if (error) return <ErrorState title="Couldn't load this analysis" error={error} onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <ScoreOverviewCard analysis={analysis} />
      <div className="grid gap-6 lg:grid-cols-2">
        <StrengthsCard strengths={analysis.strengths} />
        <ImprovementsCard improvements={analysis.improvements} />
      </div>
      {analysis.resources.length > 0 && <ResourcesCard resources={analysis.resources} />}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed p-4">
        <p className="text-sm text-muted-foreground">Turn these improvement areas into a week-by-week plan.</p>
        <Button asChild>
          <Link to={paths.app.roadmap}>
            <Map /> Build my roadmap
          </Link>
        </Button>
      </div>
    </div>
  );
};
