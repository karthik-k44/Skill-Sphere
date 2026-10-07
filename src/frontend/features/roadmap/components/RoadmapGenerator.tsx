import { useState } from "react";
import { AlertTriangle, Loader2, Wand2 } from "lucide-react";
import { ConfirmDialog } from "@/frontend/components/feedback/ConfirmDialog";
import { Alert, AlertDescription, AlertTitle } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Input } from "@/frontend/components/ui/input";
import { Label } from "@/frontend/components/ui/label";
import { Switch } from "@/frontend/components/ui/switch";
import { roadmapService } from "../services";

type RoadmapGeneratorProps = { defaultRole: string; hasRoadmap: boolean };

export const RoadmapGenerator = ({ defaultRole, hasRoadmap }: RoadmapGeneratorProps) => {
  const [targetRole, setTargetRole] = useState(defaultRole);
  const [useLatestAnalysis, setUseLatestAnalysis] = useState(true);
  const generate = roadmapService.useGenerateRoadmapMutation();

  const OnGenerate = () => generate.mutate({ targetRole, useLatestAnalysis });

  const button = (
    <Button className="w-full" onClick={hasRoadmap ? undefined : OnGenerate} disabled={generate.isPending}>
      {generate.isPending ? <Loader2 className="animate-spin" /> : <Wand2 />}
      {generate.isPending ? "Planning…" : hasRoadmap ? "Regenerate roadmap" : "Generate roadmap"}
    </Button>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{hasRoadmap ? "Rebuild your plan" : "Create your learning roadmap"}</CardTitle>
        <CardDescription>5–8 practical, project-driven steps that build on what you already know.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="roadmap-role">Target role</Label>
          <Input
            id="roadmap-role"
            placeholder="e.g. Backend Developer"
            value={targetRole}
            onChange={(event) => setTargetRole(event.target.value)}
            maxLength={100}
          />
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg border p-3">
          <Label htmlFor="roadmap-analysis" className="flex flex-col items-start gap-0.5 font-normal">
            <span className="font-medium">Use my latest analysis</span>
            <span className="text-xs text-muted-foreground">Focus the plan on the gaps the analyzer found.</span>
          </Label>
          <Switch id="roadmap-analysis" checked={useLatestAnalysis} onCheckedChange={setUseLatestAnalysis} />
        </div>
        {generate.error && !generate.isPending && (
          <Alert variant="destructive">
            <AlertTriangle />
            <AlertTitle>The roadmap didn't finish</AlertTitle>
            <AlertDescription>{generate.error.message}</AlertDescription>
          </Alert>
        )}
        {hasRoadmap ? (
          <ConfirmDialog
            trigger={button}
            title="Replace your current roadmap?"
            description="A new plan replaces the current one, and the progress you've ticked off on it will be lost."
            confirmLabel="Replace roadmap"
            onConfirm={OnGenerate}
          />
        ) : (
          button
        )}
      </CardContent>
    </Card>
  );
};
