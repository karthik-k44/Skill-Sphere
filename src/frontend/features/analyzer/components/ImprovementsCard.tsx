import { Badge } from "@/frontend/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { ImprovementPriorityTypeEnum, type ImprovementType } from "../types";

const PRIORITY_ORDER = [ImprovementPriorityTypeEnum.HIGH, ImprovementPriorityTypeEnum.MEDIUM, ImprovementPriorityTypeEnum.LOW];

const PRIORITY_STYLE: Record<ImprovementPriorityTypeEnum, string> = {
  high: "border-destructive/40 text-destructive",
  medium: "border-warning/50 text-warning",
  low: "text-muted-foreground",
};

export const ImprovementsCard = ({ improvements }: { improvements: ImprovementType[] }) => {
  const sorted = [...improvements].sort(
    (a, b) => PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>What to improve</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4">
          {sorted.map((item) => (
            <li key={item.title} className="space-y-1">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium">{item.title}</p>
                <Badge variant="outline" className={`shrink-0 capitalize ${PRIORITY_STYLE[item.priority]}`}>
                  {item.priority}
                </Badge>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};
