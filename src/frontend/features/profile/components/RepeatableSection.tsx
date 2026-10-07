import type { ReactNode } from "react";
import { Plus, type LucideIcon } from "lucide-react";
import { EmptyState } from "@/frontend/components/feedback/EmptyState";
import { Button } from "@/frontend/components/ui/button";

type RepeatableSectionProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  count: number;
  addLabel: string;
  emptyTitle: string;
  onAdd: () => void;
  children: ReactNode;
};

/** Heading + list + "add" button shared by every list step of the profile editor. */
export const RepeatableSection = ({
  title,
  description,
  icon,
  count,
  addLabel,
  emptyTitle,
  onAdd,
  children,
}: RepeatableSectionProps) => (
  <section className="space-y-4">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {count > 0 && (
        <Button type="button" variant="outline" size="sm" onClick={onAdd}>
          <Plus /> {addLabel}
        </Button>
      )}
    </div>
    {count === 0 ? (
      <EmptyState
        icon={icon}
        title={emptyTitle}
        description={description}
        action={
          <Button type="button" onClick={onAdd}>
            <Plus /> {addLabel}
          </Button>
        }
      />
    ) : (
      <div className="space-y-4">{children}</div>
    )}
  </section>
);
