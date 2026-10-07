import { Card, CardContent } from "@/frontend/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/frontend/components/ui/tabs";
import { PROFILE_STEPS } from "../lib/profile-steps";
import { ProfileStepTypeEnum } from "../types";
import { BasicsSection } from "./BasicsSection";
import { EducationSection } from "./EducationSection";
import { ExperienceSection } from "./ExperienceSection";
import { ExtrasSection } from "./ExtrasSection";
import { ProjectsSection } from "./ProjectsSection";
import { SkillsSection } from "./SkillsSection";

const SECTIONS: Record<ProfileStepTypeEnum, () => React.JSX.Element> = {
  [ProfileStepTypeEnum.BASICS]: BasicsSection,
  [ProfileStepTypeEnum.SKILLS]: SkillsSection,
  [ProfileStepTypeEnum.EXPERIENCE]: ExperienceSection,
  [ProfileStepTypeEnum.EDUCATION]: EducationSection,
  [ProfileStepTypeEnum.PROJECTS]: ProjectsSection,
  [ProfileStepTypeEnum.EXTRAS]: ExtrasSection,
};

type ProfileStepsProps = {
  step: ProfileStepTypeEnum;
  onStepChange: (step: ProfileStepTypeEnum) => void;
  stepsWithErrors: Set<ProfileStepTypeEnum>;
};

export const ProfileSteps = ({ step, onStepChange, stepsWithErrors }: ProfileStepsProps) => (
  <Tabs value={step} onValueChange={(value) => onStepChange(value as ProfileStepTypeEnum)} className="gap-4">
    <TabsList className="h-auto w-full flex-wrap justify-start gap-1 sm:flex-nowrap">
      {PROFILE_STEPS.map(({ value, label, icon: Icon }) => (
        <TabsTrigger key={value} value={value} className="relative flex-none sm:flex-1">
          <Icon /> {label}
          {stepsWithErrors.has(value) && (
            <span className="absolute top-1 right-1 size-1.5 rounded-full bg-destructive" aria-label="has errors" />
          )}
        </TabsTrigger>
      ))}
    </TabsList>
    {PROFILE_STEPS.map(({ value }) => {
      const Section = SECTIONS[value];
      return (
        <TabsContent key={value} value={value}>
          <Card>
            <CardContent>
              <Section />
            </CardContent>
          </Card>
        </TabsContent>
      );
    })}
  </Tabs>
);
