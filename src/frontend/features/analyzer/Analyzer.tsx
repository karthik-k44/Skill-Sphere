import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, UserRound } from "lucide-react";
import { EmptyState } from "@/frontend/components/feedback/EmptyState";
import { ErrorState } from "@/frontend/components/feedback/ErrorState";
import { PageHeader } from "@/frontend/components/layout/PageHeader";
import { Button } from "@/frontend/components/ui/button";
import { Skeleton } from "@/frontend/components/ui/skeleton";
import { paths } from "@/frontend/config/paths";
import { profileService } from "@/frontend/features/profile/services";
import { useDocumentTitle } from "@/frontend/hooks/use-document-title";
import { AnalysisHistory } from "./components/AnalysisHistory";
import { AnalysisReport } from "./components/AnalysisReport";
import { GenerateAnalysisCard } from "./components/GenerateAnalysisCard";
import { analyzerService } from "./services";

const Analyzer = () => {
  useDocumentTitle("AI Analyzer");
  const [selectedId, setSelectedId] = useState<string>();
  const profile = profileService.useMyProfile();
  const analyses = analyzerService.useAnalyses();

  if (profile.isPending || analyses.isPending) return <Skeleton className="h-[480px] w-full rounded-xl" />;
  if (analyses.error) return <ErrorState error={analyses.error} onRetry={() => analyses.refetch()} />;

  const items = analyses.data.items;
  const activeId = selectedId ?? items[0]?.id;

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Analyzer"
        description="Recruiter-style feedback on your profile, with scores you can track over time."
      />
      {!profile.data ? (
        <EmptyState
          icon={UserRound}
          title="Build your profile first"
          description="The analyzer reviews your saved skills, experience and projects."
          action={
            <Button asChild>
              <Link to={paths.app.profile}>Go to profile</Link>
            </Button>
          }
        />
      ) : (
        <>
          <GenerateAnalysisCard
            defaultRole={profile.data.targetRole}
            nextAllowedAt={analyses.data.nextAllowedAt}
            onGenerated={setSelectedId}
          />
          {activeId ? (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
              <AnalysisReport id={activeId} />
              {items.length > 1 && <AnalysisHistory items={items} selectedId={activeId} onSelect={setSelectedId} />}
            </div>
          ) : (
            <EmptyState
              icon={Sparkles}
              title="No analysis yet"
              description="Generate your first analysis to get an overall score, area scores, strengths, gaps and learning resources."
            />
          )}
        </>
      )}
    </div>
  );
};

export default Analyzer;
