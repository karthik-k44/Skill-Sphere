import { ErrorState } from "@/frontend/components/feedback/ErrorState";
import { PageHeader } from "@/frontend/components/layout/PageHeader";
import { authService } from "@/frontend/features/auth/services";
import { useDocumentTitle } from "@/frontend/hooks/use-document-title";
import { ProfileEditor } from "./components/ProfileEditor";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import { profileService } from "./services";

const Profile = () => {
  useDocumentTitle("Profile");
  const { data: user } = authService.useSession();
  const { data: profile, isPending, error, refetch } = profileService.useMyProfile();

  return (
    <div className="space-y-6">
      <PageHeader
        title={profile ? "Your profile" : "Build your profile"}
        description="Everything the analyzer, job matcher, roadmap and resume builder use. Save whenever you like."
      />
      {isPending || !user ? (
        <ProfileSkeleton />
      ) : error ? (
        <ErrorState title="Couldn't load your profile" error={error} onRetry={() => refetch()} />
      ) : (
        <ProfileEditor profile={profile ?? null}userId={user.id} userName={user.name} />
      )}
    </div>
  );
};

export default Profile;
