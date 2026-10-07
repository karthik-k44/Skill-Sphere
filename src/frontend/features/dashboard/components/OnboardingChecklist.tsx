import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Progress } from "@/frontend/components/ui/progress";
import { paths } from "@/frontend/config/paths";
import { Cn } from "@/frontend/lib/utils";

type OnboardingChecklistProps = {
  hasProfile: boolean;
  profilePercent: number;
  hasAnalysis: boolean;
  hasJobMatch: boolean;
  hasRoadmap: boolean;
};

/** First-run guide; hides itself once every step is done. */
export const OnboardingChecklist = ({ hasProfile, profilePercent, hasAnalysis, hasJobMatch, hasRoadmap }: OnboardingChecklistProps) => {
  const steps = [
    { label: "Create your profile", done: hasProfile, to: paths.app.profile },
    { label: "Reach 75% profile strength", done: profilePercent >= 75, to: paths.app.profile },
    { label: "Run your first AI analysis", done: hasAnalysis, to: paths.app.analyzer },
    { label: "Compare yourself to a job posting", done: hasJobMatch, to: paths.app.jobMatch },
    { label: "Generate a learning roadmap", done: hasRoadmap, to: paths.app.roadmap },
  ];
  const doneCount = steps.filter((step) => step.done).length;
  if (doneCount === steps.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get set up</CardTitle>
        <CardDescription>
          {doneCount} of {steps.length} done — each step unlocks better advice.
        </CardDescription>
        <Progress value={(doneCount / steps.length) * 100} className="mt-2" aria-label="Setup progress" />
      </CardHeader>
      <CardContent>
        <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <li key={step.label}>
              <Link
                to={step.to}
                className={Cn(
                  "group flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent",
                  step.done && "text-muted-foreground",
                )}
              >
                {step.done ? <CheckCircle2 className="size-4 text-success" /> : <Circle className="size-4 text-muted-foreground" />}
                <span className={Cn("flex-1", step.done && "line-through")}>{step.label}</span>
                {!step.done && <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
