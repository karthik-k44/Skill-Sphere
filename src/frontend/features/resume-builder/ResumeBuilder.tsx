import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Pencil } from "lucide-react";
import { EmptyState } from "@/frontend/components/feedback/EmptyState";
import { ErrorState } from "@/frontend/components/feedback/ErrorState";
import { PageHeader } from "@/frontend/components/layout/PageHeader";
import { Button } from "@/frontend/components/ui/button";
import { Skeleton } from "@/frontend/components/ui/skeleton";
import { paths } from "@/frontend/config/paths";
import { authService } from "@/frontend/features/auth/services";
import { profileService } from "@/frontend/features/profile/services";
import { useDocumentTitle } from "@/frontend/hooks/use-document-title";
import { ReadStorage, WriteStorage } from "@/frontend/lib/storage";
import { ResumeOptionsPanel } from "./components/ResumeOptionsPanel";
import { ResumePreview } from "./components/ResumePreview";
import { DEFAULT_RESUME_OPTIONS } from "./lib/resume-options";
import { ToResumeData } from "./lib/resume-data";
import type { ResumeOptionsType } from "./types";

const OPTIONS_KEY = "skillsphere:resume-options";

const ResumeBuilder = () => {
  useDocumentTitle("Resume Builder");
  const { data: user } = authService.useSession();
  const profile = profileService.useMyProfile();
  const [options, setOptions] = useState<ResumeOptionsType>(
    () => ({ ...DEFAULT_RESUME_OPTIONS, ...ReadStorage<ResumeOptionsType>(OPTIONS_KEY) }),
  );

  const data = useMemo(
    () => (profile.data && user ? ToResumeData(profile.data, user.name, user.email) : null),
    [profile.data, user],
  );

  const ChangeOptions = (next: ResumeOptionsType) => {
    setOptions(next);
    WriteStorage(OPTIONS_KEY, next);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resume Builder"
        description="Your profile, laid out as a clean PDF. Edit your profile to change the content; style it here."
        actions={
          <Button variant="outline" asChild>
            <Link to={paths.app.profile}>
              <Pencil /> Edit content
            </Link>
          </Button>
        }
      />
      {profile.isPending ? (
        <Skeleton className="h-[600px] w-full rounded-xl" />
      ) : profile.error ? (
        <ErrorState error={profile.error} onRetry={() => profile.refetch()} />
      ) : !data ? (
        <EmptyState
          icon={FileText}
          title="Nothing to put on a resume yet"
          description="Fill in your profile (or import your old resume) and it will appear here instantly."
          action={
            <Button asChild>
              <Link to={paths.app.profile}>Build my profile</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-20 lg:self-start">
            <ResumeOptionsPanel options={options} onChange={ChangeOptions} />
          </div>
          <ResumePreview data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
