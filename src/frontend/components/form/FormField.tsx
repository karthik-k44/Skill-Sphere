import type { ReactNode } from "react";
import { Label } from "@/frontend/components/ui/label";
import { Cn } from "@/frontend/lib/utils";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string | false;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
};

/** Label + control + hint/error, with the error wired to the control via aria-describedby ids. */
export const FormField = ({ label, htmlFor, error, hint, optional, className, children }: FormFieldProps) => (
  <div className={Cn("grid gap-2", className)}>
    <Label htmlFor={htmlFor} className="flex items-center gap-1.5">
      {label}
      {optional && <span className="text-xs font-normal text-muted-foreground">(optional)</span>}
    </Label>
    {children}
    {error ? (
      <p id={`${htmlFor}-error`} role="alert" className="text-xs font-medium text-destructive">
        {error}
      </p>
    ) : (
      hint && (
        <p id={`${htmlFor}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )
    )}
  </div>
);
