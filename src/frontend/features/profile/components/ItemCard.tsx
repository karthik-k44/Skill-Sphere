import type { ReactNode } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent } from "@/frontend/components/ui/card";

type ItemCardProps = {
  title: string;
  subtitle?: string;
  onRemove: () => void;
  removeLabel: string;
  children: ReactNode;
};

export const ItemCard = ({ title, subtitle, onRemove, removeLabel, children }: ItemCardProps) => (
  <Card className="gap-4 py-4 shadow-none">
    <div className="flex items-start justify-between gap-3 px-4">
      <div className="min-w-0">
        <p className="truncate font-medium">{title}</p>
        {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
        aria-label={removeLabel}
      >
        <Trash2 />
      </Button>
    </div>
    <CardContent className="grid gap-4 px-4 sm:grid-cols-2">{children}</CardContent>
  </Card>
);
