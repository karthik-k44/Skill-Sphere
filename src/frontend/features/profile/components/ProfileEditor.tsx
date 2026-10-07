import { useState } from "react";
import { Form, Formik, type FormikHelpers, type FormikProps } from "formik";
import { ToastManager } from "@/frontend/lib/toast-manager";
import { ZodFormikValidate } from "@/frontend/lib/zod-formik-validate";
import { ToFormValues, ToProfileInput } from "../lib/profile-form";
import { FirstStepWithErrors } from "../lib/profile-steps";
import { profileService } from "../services";
import { ProfileFormSchema, ProfileStepTypeEnum, type ProfileFormValues, type ProfileResponseType } from "../types";
import { ProfileWorkspace } from "./ProfileWorkspace";

type ProfileEditorProps = { profile: ProfileResponseType | null; userId: string; userName: string };

const validate = ZodFormikValidate<ProfileFormValues>(ProfileFormSchema);

export const ProfileEditor = ({ profile, userId, userName }: ProfileEditorProps) => {
  const [step, setStep] = useState<ProfileStepTypeEnum>(ProfileStepTypeEnum.BASICS);
  const [savedAt, setSavedAt] = useState(0);
  const save = profileService.useSaveProfileMutation();

  const OnSubmit = (values: ProfileFormValues, helpers: FormikHelpers<ProfileFormValues>) =>
    save.mutate(ToProfileInput(values), {
      onSuccess: (saved) => {
        helpers.resetForm({ values: ToFormValues(saved) });
        setSavedAt(Date.now());
      },
    });

  /** Formik won't call onSubmit while invalid, so surface which step holds the problem. */
  const JumpToErrors = (formik: FormikProps<ProfileFormValues>) =>
    formik.validateForm().then((errors) => {
      const firstStep = FirstStepWithErrors(errors);
      if (!firstStep) return;
      setStep(firstStep);
      ToastManager.Error(new Error("Fix the highlighted fields, then save again."), "Some details need attention");
    });

  return (
    <Formik<ProfileFormValues>
      initialValues={ToFormValues(profile)}
      validate={validate}
      validateOnChange={false}
      onSubmit={OnSubmit}
    >
      {(formik) => (
        <Form noValidate onSubmitCapture={() => JumpToErrors(formik)}>
          <ProfileWorkspace
            profile={profile}
            userId={userId}
            userName={userName}
            step={step}
            onStepChange={setStep}
            isSaving={save.isPending}
            savedAt={savedAt}
          />
        </Form>
      )}
    </Formik>
  );
};
