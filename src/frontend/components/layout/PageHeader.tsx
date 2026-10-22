import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

/** Section-level statement: 28px → 40px display type in Ink, 17px Slate supporting copy. */
export const PageHeader = ({ title, description, actions }: PageHeaderProps) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="space-y-2">
      <h1 className="text-headline font-semibold sm:text-feature">{title}</h1>
      {description && <p className="max-w-2xl text-muted-foreground">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
  </div>
);
