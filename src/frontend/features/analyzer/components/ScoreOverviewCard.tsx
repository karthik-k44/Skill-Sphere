import { ScoreRing } from "@/frontend/components/data-display/ScoreRing";
import { Badge } from "@/frontend/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { FormatDateTime, ScoreTone } from "@/frontend/utils/format";
import type { AnalysisResponseType } from "../types";
import { AreaScoresChart } from "./AreaScoresChart";

export const ScoreOverviewCard = ({ analysis }: { analysis: AnalysisResponseType }) => {
  const tone = ScoreTone(analysis.overallScore);

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <CardTitle>Job readiness{analysis.targetRole && ` · ${analysis.targetRole}`}</CardTitle>
        <span className="text-xs text-muted-foreground">{FormatDateTime(analysis.createdAt)}</span>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
        <div className="flex flex-col items-center gap-3 md:border-r md:pr-8">
          <ScoreRing value={analysis.overallScore} size={148} label="Overall" />
          <Badge variant="outline" className={tone.className}>
            {tone.label}
          </Badge>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="space-y-2">
            <h3 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Recruiter summary</h3>
            <p className="leading-7">{analysis.summary}</p>
          </div>
          <AreaScoresChart scores={analysis.scores} />
        </div>
      </CardContent>
    </Card>
  );
};
