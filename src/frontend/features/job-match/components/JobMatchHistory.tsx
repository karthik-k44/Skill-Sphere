import { Plus } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Cn } from "@/frontend/lib/utils";
import { FormatRelative, ScoreTone } from "@/frontend/utils/format";
import type { JobMatchSummaryType } from "../types";

type JobMatchHistoryProps = {
  items: JobMatchSummaryType[];
  selectedId: string | undefined;
  onSelect: (id: string | undefined) => void;
};

export const JobMatchHistory = ({ items, selectedId, onSelect }: JobMatchHistoryProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-base">Past matches</CardTitle>
      <Button size="sm" variant="ghost" onClick={() => onSelect(undefined)}>
        <Plus /> New
      </Button>
    </CardHeader>
    <CardContent>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Your comparisons will appear here.</p>
      ) : (
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={item.id === selectedId}
                className={Cn(
                  "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-accent",
                  item.id === selectedId && "bg-accent",
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium">{item.jobTitle}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {[item.company, FormatRelative(item.createdAt)].filter(Boolean).join(" · ")}
                  </span>
                </span>
                <span className={Cn("font-semibold tabular-nums", ScoreTone(item.matchScore).className)}>
                  {item.matchScore}%
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);
