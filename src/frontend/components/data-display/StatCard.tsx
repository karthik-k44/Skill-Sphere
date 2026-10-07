import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/frontend/components/ui/card";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
};

export const StatCard = ({ label, value, icon: Icon, hint }: StatCardProps) => (
  <Card className="gap-0 py-0">
    <CardContent className="flex items-center gap-4 p-5">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="truncate text-2xl font-semibold tabular-nums">{value}</p>
        {hint && <p className="truncate text-xs text-muted-foreground">{hint}</p>}
      </div>
    </CardContent>
  </Card>
);
