import { useState } from "react";
import { PageHeader } from "@/frontend/components/layout/PageHeader";
import { ErrorState } from "@/frontend/components/feedback/ErrorState";
import { Skeleton } from "@/frontend/components/ui/skeleton";
import { authService } from "@/frontend/features/auth/services";
import { useDocumentTitle } from "@/frontend/hooks/use-document-title";
import { JobMatchForm } from "./components/JobMatchForm";
import { JobMatchHistory } from "./components/JobMatchHistory";
import { JobMatchResult } from "./components/JobMatchResult";
import { jobMatchService } from "./services";

const JobMatch = () => {
  useDocumentTitle("Job Match");
  // undefined = default view, null = the "new match" form chosen explicitly.
  const [selectedId, setSelectedId] = useState<string | null>();
  const matches = jobMatchService.useJobMatches();
  const isDemo = Boolean(authService.useSession().data?.isDemo);
  const activeId = selectedId === undefined ? (isDemo ? matches.data?.[0]?.id : undefined) : (selectedId ?? undefined);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Match"
        description="Paste a job posting to see how well you fit, which skills are missing, and resume bullets written for it."
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          {activeId ? (
            <JobMatchResult id={activeId} onDeleted={() => setSelectedId(null)} />
          ) : (
            <JobMatchForm onCreated={setSelectedId} />
          )}
        </div>
        {matches.isPending ? (
          <Skeleton className="h-64 rounded-xl" />
        ) : matches.error ? (
          <ErrorState error={matches.error} onRetry={() => matches.refetch()} />
        ) : (
          <JobMatchHistory items={matches.data} selectedId={activeId} onSelect={(id) => setSelectedId(id ?? null)} />
        )}
      </div>
    </div>
  );
};

export default JobMatch;
