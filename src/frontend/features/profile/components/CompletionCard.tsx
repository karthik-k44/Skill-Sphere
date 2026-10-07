import { CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Progress } from "@/frontend/components/ui/progress";
import { GetProfileCompletion } from "@/frontend/utils/profile-completion";
import type { ProfileFormValues, ProfileStepTypeEnum } from "../types";

type CompletionCardProps = {
  values: ProfileFormValues;
  onJump: (step: ProfileStepTypeEnum) => void;
};

export const CompletionCard = ({ values, onJump }: CompletionCardProps) => {
  const { percent, items } = GetProfileCompletion(values);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Profile strength <span className="text-primary tabular-nums">{percent}%</span>
        </CardTitle>
        <CardDescription>Complete profiles get sharper AI feedback.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={percent} aria-label="Profile completion" />
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => onJump(item.step as ProfileStepTypeEnum)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent"
              >
                {item.done ? (
                  <CheckCircle2 className="size-4 shrink-0 text-success" />
                ) : (
                  <Circle className="size-4 shrink-0 text-muted-foreground" />
                )}
                <span className={item.done ? "text-muted-foreground line-through" : ""}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
