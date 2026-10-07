import { useState } from "react";
import { PageHeader } from "@/frontend/components/layout/PageHeader";
import { ErrorState } from "@/frontend/components/feedback/ErrorState";
import { Skeleton } from "@/frontend/components/ui/skeleton";
import { useDocumentTitle } from "@/frontend/hooks/use-document-title";
import { JobMatchForm } from "./components/JobMatchForm";
import { JobMatchHistory } from "./components/JobMatchHistory";
import { JobMatchResult } from "./components/JobMatchResult";
import { jobMatchService } from "./services";

const JobMatch = () => {
  useDocumentTitle("Job Match");
  const [selectedId, setSelectedId] = useState<string>();
  const matches = jobMatchService.useJobMatches();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Match"
        description="Paste a job posting to see how well you fit, which skills are missing, and resume bullets written for it."
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          {selectedId ? (
            <JobMatchResult id={selectedId} onDeleted={() => setSelectedId(undefined)} />
          ) : (
            <JobMatchForm onCreated={setSelectedId} />
          )}
        </div>
        {matches.isPending ? (
          <Skeleton className="h-64 rounded-xl" />
        ) : matches.error ? (
          <ErrorState error={matches.error} onRetry={() => matches.refetch()} />
        ) : (
          <JobMatchHistory items={matches.data} selectedId={selectedId} onSelect={setSelectedId} />
        )}
      </div>
    </div>
  );
};

export default JobMatch;
