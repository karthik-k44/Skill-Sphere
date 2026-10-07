import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Cn } from "@/frontend/lib/utils";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export const EmptyState = ({ icon: Icon, title, description, action, className }: EmptyStateProps) => (
  <div
    className={Cn(
      "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-12 text-center",
      className,
    )}
  >
    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Icon className="size-6" />
    </div>
    <div className="max-w-sm space-y-1">
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
    {action && <div className="mt-2">{action}</div>}
  </div>
);
