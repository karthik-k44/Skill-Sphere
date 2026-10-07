import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScoreRing } from "@/frontend/components/data-display/ScoreRing";
import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Skeleton } from "@/frontend/components/ui/skeleton";
import { paths } from "@/frontend/config/paths";
import { analyzerService } from "@/frontend/features/analyzer/services";
import { FormatRelative } from "@/frontend/utils/format";

export const LatestAnalysisCard = ({ analysisId }: { analysisId: string | undefined }) => {
  const { data: analysis, isPending } = analyzerService.useAnalysis(analysisId);
  const topImprovement = analysis?.improvements.find((item) => item.priority === "high") ?? analysis?.improvements[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" /> Latest AI review
        </CardTitle>
        {analysis && <CardDescription>{FormatRelative(analysis.createdAt)}</CardDescription>}
      </CardHeader>
      <CardContent>
        {!analysisId ? (
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>Get a readiness score, strengths and the gaps holding you back.</p>
            <Button asChild>
              <Link to={paths.app.analyzer}>Run my first analysis</Link>
            </Button>
          </div>
        ) : isPending || !analysis ? (
          <Skeleton className="h-36 w-full" />
        ) : (
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <ScoreRing value={analysis.overallScore} size={112} label="Overall" />
            <div className="flex-1 space-y-3">
              {topImprovement && (
                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Focus next</p>
                  <p className="font-medium">{topImprovement.title}</p>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{topImprovement.detail}</p>
                </div>
              )}
              <Button variant="link" className="h-auto px-0" asChild>
                <Link to={paths.app.analyzer}>
                  Full report <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
