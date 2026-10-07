import { Link } from "react-router-dom";
import { Map, UserRound } from "lucide-react";
import { EmptyState } from "@/frontend/components/feedback/EmptyState";
import { ErrorState } from "@/frontend/components/feedback/ErrorState";
import { PageHeader } from "@/frontend/components/layout/PageHeader";
import { Button } from "@/frontend/components/ui/button";
import { Skeleton } from "@/frontend/components/ui/skeleton";
import { paths } from "@/frontend/config/paths";
import { profileService } from "@/frontend/features/profile/services";
import { useDocumentTitle } from "@/frontend/hooks/use-document-title";
import { RoadmapGenerator } from "./components/RoadmapGenerator";
import { RoadmapTimeline } from "./components/RoadmapTimeline";
import { roadmapService } from "./services";

const Roadmap = () => {
  useDocumentTitle("Roadmap");
  const profile = profileService.useMyProfile();
  const roadmap = roadmapService.useRoadmap();

  if (profile.isPending || roadmap.isPending) return <Skeleton className="h-[480px] w-full rounded-xl" />;
  if (roadmap.error) return <ErrorState error={roadmap.error} onRetry={() => roadmap.refetch()} />;

  return (
    <div className="space-y-6">
      <PageHeader title="Learning roadmap" description="A personal plan that turns your skill gaps into finished projects." />
      {!profile.data ? (
        <EmptyState
          icon={UserRound}
          title="Build your profile first"
          description="Your roadmap starts from the skills and experience you already have."
          action={
            <Button asChild>
              <Link to={paths.app.profile}>Go to profile</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            {roadmap.data ? (
              <RoadmapTimeline roadmap={roadmap.data} />
            ) : (
              <EmptyState
                icon={Map}
                title="No roadmap yet"
                description="Generate one and tick off steps as you go. Your progress shows up on the dashboard."
              />
            )}
          </div>
          <div className="xl:sticky xl:top-20 xl:self-start">
            <RoadmapGenerator
              defaultRole={roadmap.data?.targetRole || profile.data.targetRole}
              hasRoadmap={Boolean(roadmap.data)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
