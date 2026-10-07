import { useState } from "react";
import { AlertTriangle, Loader2, Sparkles, Timer } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Input } from "@/frontend/components/ui/input";
import { Label } from "@/frontend/components/ui/label";
import { FormatCountdown } from "@/frontend/utils/format";
import { useCountdown } from "../lib/use-countdown";
import { analyzerService } from "../services";

type GenerateAnalysisCardProps = {
  defaultRole: string;
  nextAllowedAt: string | null;
  onGenerated: (id: string) => void;
};

export const GenerateAnalysisCard = ({ defaultRole, nextAllowedAt, onGenerated }: GenerateAnalysisCardProps) => {
  const [targetRole, setTargetRole] = useState(defaultRole);
  const generate = analyzerService.useGenerateAnalysisMutation();
  const remaining = useCountdown(nextAllowedAt);
  const isCoolingDown = remaining > 0;

  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" /> Run a new analysis
        </CardTitle>
        <CardDescription>
          The AI reviews your saved profile like a recruiter would: scores, strengths, gaps and where to learn.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
          onSubmit={(event) => {
            event.preventDefault();
            generate.mutate({ targetRole }, { onSuccess: (analysis) => onGenerated(analysis.id) });
          }}
        >
          <div className="grid flex-1 gap-2">
            <Label htmlFor="analysis-role">Evaluate me for</Label>
            <Input
              id="analysis-role"
              placeholder="e.g. Full Stack Developer (defaults to your target role)"
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              maxLength={100}
            />
          </div>
          <Button type="submit" size="lg" disabled={generate.isPending || isCoolingDown} className="sm:w-56">
            {generate.isPending ? (
              <>
                <Loader2 className="animate-spin" /> Analysing…
              </>
            ) : isCoolingDown ? (
              <>
                <Timer /> Available in {FormatCountdown(remaining)}
              </>
            ) : (
              <>
                <Sparkles /> Generate analysis
              </>
            )}
          </Button>
        </form>
        {generate.isPending && (
          <p className="mt-3 text-sm text-muted-foreground" role="status">
            This usually takes 10–20 seconds.
          </p>
        )}
        {generate.error && !generate.isPending && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle />
            <AlertTitle>The analysis didn't finish</AlertTitle>
            <AlertDescription>{generate.error.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
