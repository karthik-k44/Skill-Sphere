import { AlertTriangle, RotateCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";

type ErrorStateProps = {
  title?: string;
  error?: Error | null;
  onRetry?: () => void;
};

export const ErrorState = ({ title = "Something went wrong", error, onRetry }: ErrorStateProps) => (
  <Alert variant="destructive">
    <AlertTriangle />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
      <span>{error?.message ?? "Please try again in a moment."}</span>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          <RotateCw /> Retry
        </Button>
      )}
    </AlertDescription>
  </Alert>
);
