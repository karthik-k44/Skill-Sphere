import { BookOpen, ExternalLink, GraduationCap, Hammer, MessagesSquare, Newspaper, PlayCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { LearningResourceTypeEnum, type LearningResourceType } from "../types";

const ICONS = {
  [LearningResourceTypeEnum.DOCS]: BookOpen,
  [LearningResourceTypeEnum.COURSE]: GraduationCap,
  [LearningResourceTypeEnum.PROJECT]: Hammer,
  [LearningResourceTypeEnum.VIDEO]: PlayCircle,
  [LearningResourceTypeEnum.ARTICLE]: Newspaper,
  [LearningResourceTypeEnum.COMMUNITY]: MessagesSquare,
};

/** Only http(s) links are rendered as anchors; the model's URLs are untrusted text. */
const SafeUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : "");

export const ResourcesCard = ({ resources }: { resources: LearningResourceType[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Where to learn</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-3 sm:grid-cols-2">
      {resources.map((resource) => {
        const Icon = ICONS[resource.type] ?? BookOpen;
        const href = SafeUrl(resource.url);
        return (
          <div key={resource.title} className="flex gap-3 rounded-lg border p-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Icon className="size-4" />
            </div>
            <div className="min-w-0 space-y-1">
              {href ? (
                <a href={href} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-medium hover:underline">
                  {resource.title} <ExternalLink className="size-3" />
                </a>
              ) : (
                <p className="font-medium">{resource.title}</p>
              )}
              <p className="text-sm text-muted-foreground">{resource.reason}</p>
            </div>
          </div>
        );
      })}
    </CardContent>
  </Card>
);
