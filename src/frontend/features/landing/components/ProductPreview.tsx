import { CheckCircle2 } from "lucide-react";
import { ScoreRing } from "@/frontend/components/data-display/ScoreRing";
import { Progress } from "@/frontend/components/ui/progress";

const AREAS = [
  { label: "Skills", value: 82 },
  { label: "Projects", value: 68 },
  { label: "Experience", value: 61 },
];

/**
 * The hero's "product render": a static analyzer card with a floating callout. White on the gray
 * stage, 28px corners, no shadow; decorative, so it is one labelled image for screen readers.
 */
export const ProductPreview = () => (
  <div
    className="relative mx-auto w-full max-w-md animate-fade-up pb-10"
    style={{ animationDelay: "300ms" }}
    role="img" aria-label="Example AI analysis: overall score 78">
    <div className="space-y-6 rounded-card bg-background p-7 dark:bg-muted">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">AI review · Full Stack Developer</span>
        <span className="text-xs font-semibold text-success">Strong</span>
      </div>
      <div className="flex items-center gap-6">
        <ScoreRing value={78} size={112} label="Overall" />
        <div className="flex-1 space-y-3">
          {AREAS.map((area) => (
            <div key={area.label} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{area.label}</span>
                <span className="font-medium tabular-nums">{area.value}</span>
              </div>
              <Progress value={area.value} />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p className="text-xs tracking-[0.06em] text-muted-foreground uppercase">Focus next</p>
        <p className="flex gap-2">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> Add tests to your two main projects
        </p>
        <p className="flex gap-2">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> Ship one backend API with auth
        </p>
      </div>
    </div>
    <div className="absolute right-0 bottom-0 flex animate-float items-center gap-4 rounded-card bg-background py-3 pr-3 pl-6 shadow-hairline sm:-right-6 dark:bg-muted">
      <div>
        <p className="text-sm font-semibold">86% match</p>
        <p className="text-xs text-muted-foreground">Frontend Engineer</p>
      </div>
      <span className="rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground">See gaps</span>
    </div>
  </div>
);
