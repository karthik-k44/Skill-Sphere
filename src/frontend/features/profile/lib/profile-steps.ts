import { Award, Briefcase, FolderGit2, GraduationCap, UserRound, Wrench, type LucideIcon } from "lucide-react";
import { ProfileStepTypeEnum, type ProfileFormValues } from "../types";

export type ProfileStep = {
  value: ProfileStepTypeEnum;
  label: string;
  icon: LucideIcon;
  /** Top-level form keys edited on this step, used to jump to the first step with errors. */
  fields: (keyof ProfileFormValues)[];
};

export const PROFILE_STEPS: ProfileStep[] = [
  {
    value: ProfileStepTypeEnum.BASICS,
    label: "Basics",
    icon: UserRound,
    fields: ["headline", "targetRole", "summary", "phoneNumber", "address", "links"],
  },
  { value: ProfileStepTypeEnum.SKILLS, label: "Skills", icon: Wrench, fields: ["skills"] },
  { value: ProfileStepTypeEnum.EXPERIENCE, label: "Experience", icon: Briefcase, fields: ["experience"] },
  { value: ProfileStepTypeEnum.EDUCATION, label: "Education", icon: GraduationCap, fields: ["education"] },
  { value: ProfileStepTypeEnum.PROJECTS, label: "Projects", icon: FolderGit2, fields: ["projects"] },
  {
    value: ProfileStepTypeEnum.EXTRAS,
    label: "Extras",
    icon: Award,
    fields: ["certifications", "languages", "interests"],
  },
];

export const FirstStepWithErrors = (errors: object) =>
  PROFILE_STEPS.find((step) => step.fields.some((field) => field in errors))?.value;

export const StepIndex = (value: ProfileStepTypeEnum) => PROFILE_STEPS.findIndex((step) => step.value === value);
