import { useEffect } from "react";
import { useFormikContext } from "formik";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { PROFILE_STEPS, StepIndex } from "../lib/profile-steps";
import { useProfileDraft } from "../lib/use-profile-draft";
import type { ProfileFormValues, ProfileResponseType, ProfileStepTypeEnum } from "../types";
import { CompletionCard } from "./CompletionCard";
import { DraftBanner } from "./DraftBanner";
import { GithubImportDialog } from "./GithubImportDialog";
import { ImportResumeDialog } from "./ImportResumeDialog";
import { ProfileActionsBar } from "./ProfileActionsBar";
import { ProfileSteps } from "./ProfileSteps";
import { PublicProfileCard } from "./PublicProfileCard";

type ProfileWorkspaceProps = {
  profile: ProfileResponseType | null;
  userId: string;
  userName: string;
  step: ProfileStepTypeEnum;
  onStepChange: (step: ProfileStepTypeEnum) => void;
  isSaving: boolean;
  /** Changes every time a save succeeds, so the local draft can be dropped. */
  savedAt: number;
};

export const ProfileWorkspace = ({ profile, userId, userName, step, onStepChange, isSaving, savedAt }: ProfileWorkspaceProps) => {
  const { values, errors, dirty, setValues } = useFormikContext<ProfileFormValues>();
  const { pendingDraft, dismissDraft, clearDraft } = useProfileDraft(userId, values, dirty);
  const index = StepIndex(step);
  const stepsWithErrors = new Set(
    PROFILE_STEPS.filter((item) => item.fields.some((field) => field in errors)).map((item) => item.value),
  );

  useEffect(() => {
    if (savedAt) clearDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only when a new save lands
  }, [savedAt]);

  const RestoreDraft = () => {
    if (!pendingDraft) return;
    setValues(pendingDraft.values);
    dismissDraft();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0 space-y-4">
        {pendingDraft && <DraftBanner savedAt={pendingDraft.savedAt} onRestore={RestoreDraft} onDiscard={clearDraft} />}
        <ProfileSteps step={step} onStepChange={onStepChange} stepsWithErrors={stepsWithErrors} />
        <ProfileActionsBar
          isDirty={dirty}
          isSaving={isSaving}
          canGoBack={index > 0}
          canGoNext={index < PROFILE_STEPS.length - 1}
          onBack={() => onStepChange(PROFILE_STEPS[index - 1]?.value ?? step)}
          onNext={() => onStepChange(PROFILE_STEPS[index + 1]?.value ?? step)}
        />
      </div>
      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Skip the typing</CardTitle>
            <CardDescription>Fill the form from your resume or GitHub, then review.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ImportResumeDialog />
            <GithubImportDialog />
          </CardContent>
        </Card>
        <CompletionCard values={values} onJump={onStepChange} />
        <PublicProfileCard profile={profile} userName={userName} />
      </aside>
    </div>
  );
};
