import { CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/frontend/components/ui/badge";

type SkillsComparisonProps = { matched: string[]; missing: string[] };

const SkillList = ({ title, skills, matched }: { title: string; skills: string[]; matched: boolean }) => (
  <div className="space-y-3">
    <h3 className="flex items-center gap-2 text-sm font-medium">
      {matched ? <CheckCircle2 className="size-4 text-success" /> : <XCircle className="size-4 text-destructive" />}
      {title} <span className="text-muted-foreground">({skills.length})</span>
    </h3>
    {skills.length === 0 ? (
      <p className="text-sm text-muted-foreground">{matched ? "None identified." : "Nothing major — nice."}</p>
    ) : (
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="outline"
            className={matched ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10"}
          >
            {skill}
          </Badge>
        ))}
      </div>
    )}
  </div>
);

export const SkillsComparison = ({ matched, missing }: SkillsComparisonProps) => (
  <div className="grid gap-6 sm:grid-cols-2">
    <SkillList title="You have" skills={matched} matched />
    <SkillList title="Missing" skills={missing} matched={false} />
  </div>
);
