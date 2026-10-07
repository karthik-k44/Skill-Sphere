import { CheckCircle2, Sparkles } from "lucide-react";
import { ScoreRing } from "@/frontend/components/data-display/ScoreRing";
import { Badge } from "@/frontend/components/ui/badge";
import { Card, CardContent } from "@/frontend/components/ui/card";
import { Progress } from "@/frontend/components/ui/progress";

const AREAS = [
  { label: "Skills", value: 82 },
  { label: "Projects", value: 68 },
  { label: "Experience", value: 61 },
];

/** A static mock of the analyzer screen, so visitors see the product before signing up. */
export const ProductPreview = () => (
  <div className="relative mx-auto w-full max-w-md" aria-label="Example AI analysis" role="img">
    <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/30 via-primary/5 to-transparent blur-2xl" />
    <Card className="gap-4 shadow-2xl">
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="size-4 text-primary" /> AI review · Full Stack Developer
          </span>
          <Badge variant="outline" className="text-success">Strong</Badge>
        </div>
        <div className="flex items-center gap-6">
          <ScoreRing value={78} size={112} label="Overall" />
          <div className="flex-1 space-y-3">
            {AREAS.map((area) => (
              <div key={area.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{area.label}</span>
                  <span className="font-medium">{area.value}</span>
                </div>
                <Progress value={area.value} />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 rounded-lg bg-muted/60 p-3 text-sm">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Focus next</p>
          <p className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> Add tests to your two main projects</p>
          <p className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> Ship one backend API with auth</p>
        </div>
      </CardContent>
    </Card>
    <Card className="absolute -right-4 -bottom-8 hidden w-44 gap-1 py-3 shadow-xl sm:flex">
      <CardContent className="px-4">
        <p className="text-xs text-muted-foreground">Job match</p>
        <p className="text-2xl font-bold text-primary">86%</p>
        <p className="text-xs text-muted-foreground">Frontend Engineer</p>
      </CardContent>
    </Card>
  </div>
);
