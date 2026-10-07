import type { LucideIcon } from "lucide-react";
import { Badge } from "@/frontend/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card";

export type PublicTimelineEntry = {
  key: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tags: string[];
  href?: string;
};

type PublicTimelineProps = { title: string; icon: LucideIcon; entries: PublicTimelineEntry[] };

/** Experience, projects and education all render as the same titled list. */
export const PublicTimeline = ({ title, icon: Icon, entries }: PublicTimelineProps) =>
  entries.length === 0 ? null : (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-4 text-primary" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-6">
          {entries.map((entry) => (
            <li key={entry.key} className="space-y-1.5 border-l-2 border-primary/30 pl-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                {entry.href ? (
                  <a href={entry.href} target="_blank" rel="noreferrer noopener" className="font-semibold hover:underline">
                    {entry.title}
                  </a>
                ) : (
                  <p className="font-semibold">{entry.title}</p>
                )}
                {entry.period && <span className="text-xs text-muted-foreground">{entry.period}</span>}
              </div>
              {entry.subtitle && <p className="text-sm text-primary">{entry.subtitle}</p>}
              {entry.description && <p className="text-sm leading-6 text-muted-foreground">{entry.description}</p>}
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
