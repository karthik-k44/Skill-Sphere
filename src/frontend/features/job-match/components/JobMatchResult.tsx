import { Lightbulb, Trash2 } from "lucide-react";
import { ScoreRing } from "@/frontend/components/data-display/ScoreRing";
import { ConfirmDialog } from "@/frontend/components/feedback/ConfirmDialog";
import { ErrorState } from "@/frontend/components/feedback/ErrorState";
import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Separator } from "@/frontend/components/ui/separator";
import { Skeleton } from "@/frontend/components/ui/skeleton";
import { FormatDateTime } from "@/frontend/utils/format";
import { jobMatchService } from "../services";
import { SkillsComparison } from "./SkillsComparison";
import { TailoredBullets } from "./TailoredBullets";

export const JobMatchResult = ({ id, onDeleted }: { id: string; onDeleted: () => void }) => {
  const { data: match, isPending, error, refetch } = jobMatchService.useJobMatch(id);
  const remove = jobMatchService.useDeleteJobMatchMutation();

  if (isPending) return <Skeleton className="h-96 w-full rounded-xl" />;
  if (error) return <ErrorState title="Couldn't load this match" error={error} onRetry={() => refetch()} />;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-xl">{match.jobTitle}</CardTitle>
          <CardDescription>
            {[match.company, FormatDateTime(match.createdAt)].filter(Boolean).join(" · ")}
          </CardDescription>
        </div>
        <ConfirmDialog
          trigger={
            <Button variant="ghost" size="icon" aria-label="Delete this match" disabled={remove.isPending}>
              <Trash2 />
            </Button>
          }
          title="Delete this match?"
          description={`The comparison for ${match.jobTitle} will be removed from your history.`}
          confirmLabel="Delete"
          onConfirm={() => remove.mutate(match.id, { onSuccess: onDeleted })}
        />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <ScoreRing value={match.matchScore} label="Match" />
          <p className="flex-1 leading-7">{match.verdict}</p>
        </div>
        <Separator />
        <SkillsComparison matched={match.matchedSkills} missing={match.missingSkills} />
        {match.tailoredBullets.length > 0 && (
          <>
            <Separator />
            <TailoredBullets bullets={match.tailoredBullets} />
          </>
        )}
        {match.recommendations.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <Lightbulb className="size-4 text-warning" /> Before you apply
              </h3>
              <ol className="list-decimal space-y-1 pl-5 text-sm leading-6 text-muted-foreground">
                {match.recommendations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
