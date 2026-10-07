import { Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Progress } from "@/frontend/components/ui/progress";
import type { SkillType } from "@/frontend/features/profile/types";

export const PublicSkills = ({ skills }: { skills: SkillType[] }) =>
  skills.length === 0 ? null : (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="size-4 text-primary" /> Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {[...skills]
          .sort((a, b) => b.rating - a.rating)
          .map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}</span>
              </div>
              <Progress value={(skill.rating / 5) * 100} aria-label={`${skill.name}: ${skill.rating} of 5`} />
            </div>
          ))}
      </CardContent>
    </Card>
  );
