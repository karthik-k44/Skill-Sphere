import { Loader2 } from "lucide-react";

export const PageLoader = ({ label = "Loading" }: { label?: string }) => (
  <div role="status" className="flex min-h-[50vh] flex-1 items-center justify-center gap-2 text-muted-foreground">
    <Loader2 className="size-5 animate-spin" />
    <span className="text-sm">{label}…</span>
  </div>
);
