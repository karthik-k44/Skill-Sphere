import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
};

/** White 28px tile on the canvas: small Slate label, large Ink figure, monochrome icon. */
export const StatCard = ({ label, value, icon: Icon, hint }: StatCardProps) => (
  <div className="flex flex-col gap-4 rounded-card bg-card p-6">
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      {label}
      <Icon className="size-4" strokeWidth={1.75} aria-hidden />
    </div>
    <div className="min-w-0">
      <p className="truncate font-display text-headline font-semibold tabular-nums">{value}</p>
      {hint && <p className="truncate text-xs text-muted-foreground">{hint}</p>}
    </div>
  </div>
);
