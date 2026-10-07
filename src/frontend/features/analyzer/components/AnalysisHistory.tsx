import { History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Cn } from "@/frontend/lib/utils";
import { FormatRelative, ScoreTone } from "@/frontend/utils/format";
import type { AnalysisSummaryType } from "../types";

type AnalysisHistoryProps = {
  items: AnalysisSummaryType[];
  selectedId: string | undefined;
  onSelect: (id: string) => void;
};

export const AnalysisHistory = ({ items, selectedId, onSelect }: AnalysisHistoryProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-base">
        <History className="size-4" /> History
      </CardTitle>
    </CardHeader>
    <CardContent>
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
                <span className="block truncate font-medium">{item.targetRole || "General review"}</span>
                <span className="text-xs text-muted-foreground">{FormatRelative(item.createdAt)}</span>
              </span>
              <span className={Cn("font-semibold tabular-nums", ScoreTone(item.overallScore).className)}>
                {item.overallScore}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);
