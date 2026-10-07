import { ErrorState } from "@/frontend/components/feedback/ErrorState";

/** Shown by the router when a page chunk fails to load (e.g. after a deploy). */
export const RouteError = () => (
  <div className="mx-auto max-w-xl p-8">
    <ErrorState
      title="This page failed to load"
      error={new Error("Refresh the page to try again.")}
      onRetry={() => window.location.reload()}
    />
  </div>
);
