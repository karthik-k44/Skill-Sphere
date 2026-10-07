import { Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/frontend/components/ui/badge";
import { Checkbox } from "@/frontend/components/ui/checkbox";
import { Cn } from "@/frontend/lib/utils";
import type { RoadmapItemType } from "../types";

type RoadmapStepProps = { item: RoadmapItemType; index: number; isLast: boolean; onToggle: (done: boolean) => void };

const SafeUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : "");

export const RoadmapStep = ({ item, index, isLast, onToggle }: RoadmapStepProps) => (
  <li className="relative flex gap-4 pb-8 last:pb-0">
    {!isLast && <span aria-hidden className="absolute top-9 left-[15px] h-[calc(100%-2.25rem)] w-px bg-border" />}
    <span
      className={Cn(
        "z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold",
        item.done ? "border-success bg-success text-white" : "border-primary/40 bg-background text-primary",
      )}
    >
      {index + 1}
    </span>
    <div className={Cn("flex-1 space-y-2 rounded-xl border p-4 transition-opacity", item.done && "opacity-70")}>
      <div className="flex items-start gap-3">
        <Checkbox
          id={`step-${item.id}`}
          className="mt-1"
          checked={item.done}
          onCheckedChange={(checked) => onToggle(checked === true)}
        />
        <label htmlFor={`step-${item.id}`} className={Cn("flex-1 cursor-pointer font-medium", item.done && "line-through")}>
          {item.title}
        </label>
      </div>
      {item.description && <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>}
      <div className="flex flex-wrap items-center gap-2">
        {item.skill && <Badge variant="secondary">{item.skill}</Badge>}
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3" /> ~{item.durationWeeks} week{item.durationWeeks === 1 ? "" : "s"}
        </span>
        {item.resources
          .filter((resource) => SafeUrl(resource.url))
          .map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              {resource.title || "Resource"} <ExternalLink className="size-3" />
            </a>
          ))}
      </div>
    </div>
  </li>
);
