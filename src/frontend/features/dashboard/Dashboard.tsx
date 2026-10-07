import { Link } from "react-router-dom";
import { FileUp, UserRound } from "lucide-react";
import { EmptyState } from "@/frontend/components/feedback/EmptyState";
import { ErrorState } from "@/frontend/components/feedback/ErrorState";
import { Button } from "@/frontend/components/ui/button";
import { paths } from "@/frontend/config/paths";
import { analyzerService } from "@/frontend/features/analyzer/services";
import { authService } from "@/frontend/features/auth/services";
import { jobMatchService } from "@/frontend/features/job-match/services";
import { profileService } from "@/frontend/features/profile/services";
import { roadmapService } from "@/frontend/features/roadmap/services";
import { useDocumentTitle } from "@/frontend/hooks/use-document-title";
import { GetProfileCompletion } from "@/frontend/utils/profile-completion";
import { DashboardSkeleton } from "./components/DashboardSkeleton";
import { DashboardStats } from "./components/DashboardStats";
import { ExperienceTimelineCard } from "./components/ExperienceTimelineCard";
import { LatestAnalysisCard } from "./components/LatestAnalysisCard";
import { OnboardingChecklist } from "./components/OnboardingChecklist";
import { RoadmapProgressCard } from "./components/RoadmapProgressCard";
import { SkillsChart } from "./components/SkillsChart";
import { WelcomeBanner } from "./components/WelcomeBanner";

const Dashboard = () => {
  useDocumentTitle("Dashboard");
  const { data: user } = authService.useSession();
  const profile = profileService.useMyProfile();
  const analyses = analyzerService.useAnalyses();
  const matches = jobMatchService.useJobMatches();
  const roadmap = roadmapService.useRoadmap();

  if (profile.isPending || !user) return <DashboardSkeleton />;
  if (profile.error) return <ErrorState title="Couldn't load your dashboard" error={profile.error} onRetry={() => profile.refetch()} />;

  const latest = analyses.data?.items[0];
  const checklist = (
    <OnboardingChecklist
      hasProfile={Boolean(profile.data)}
      profilePercent={GetProfileCompletion(profile.data).percent}
      hasAnalysis={Boolean(latest)}
      hasJobMatch={Boolean(matches.data?.length)}
      hasRoadmap={Boolean(roadmap.data)}
    />
  );

  return (
    <div className="space-y-6">
      <WelcomeBanner name={user.name} headline={profile.data?.headline ?? ""} />
      {checklist}
      {!profile.data ? (
        <EmptyState
          icon={UserRound}
          title="Your dashboard fills in as you build your profile"
          description="Start from scratch or import your existing resume — it takes about a minute."
          action={
            <Button asChild>
              <Link to={paths.app.profile}>
                <FileUp /> Build my profile
              </Link>
            </Button>
          }
        />
      ) : (
        <>
          <DashboardStats profile={profile.data} latestScore={latest?.overallScore ?? null} />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <SkillsChart skills={profile.data.skills} />
              <ExperienceTimelineCard experience={profile.data.experience} />
            </div>
            <div className="space-y-6">
              <LatestAnalysisCard analysisId={latest?.id} />
              <RoadmapProgressCard roadmap={roadmap.data} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
