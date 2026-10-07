import { Briefcase } from "lucide-react";
import { Badge } from "@/frontend/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import type { ExperienceType } from "@/frontend/features/profile/types";
import { FormatDateRange, FormatDuration, GetDurationInMonths } from "@/frontend/utils/format";

export const ExperienceTimelineCard = ({ experience }: { experience: ExperienceType[] }) => {
  const sorted = [...experience].sort(
    (a, b) => new Date(b.startDate ?? 0).getTime() - new Date(a.startDate ?? 0).getTime(),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="size-4 text-primary" /> Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">No roles yet. Internships and freelance work count too.</p>
        ) : (
          <ol className="space-y-5">
            {sorted.map((item, index) => (
              <li key={`${item.company}-${index}`} className="relative border-l-2 border-primary/30 pl-4">
                <span className="absolute top-1.5 -left-[5px] size-2 rounded-full bg-primary" aria-hidden />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">{item.role}</p>
                  {item.isCurrent && <Badge variant="secondary">Current</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.company} · {FormatDateRange(item.startDate, item.endDate, item.isCurrent)} ·{" "}
                  {FormatDuration(GetDurationInMonths(item.startDate, item.endDate, item.isCurrent))}
                </p>
                {item.domainsWorked.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.domainsWorked.map((domain) => (
                      <Badge key={domain} variant="outline">
                        {domain}
                      </Badge>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
};
