export enum SetupUiStepsType {
  CONTACT_ADDRESS = 'Contact & Address',
  SKILLS_EXPERIENCE = 'Skills & Experience',
  CERTIFICATES_LANGUAGES = 'Certificates & Languages',
  EDUCATION = 'Education',
}

export type StepType = {
  description?: string;
  id: number;
  label: string;
  title?: string;
  value: SetupUiStepsType;
};

  export const SETUP_UI_STEPS = [
    {
      id: 0,
      label: "Contact & Address",
      value: SetupUiStepsType.CONTACT_ADDRESS,
    },
    {
      id: 1,
      label: "Skills & Experience",
      value: SetupUiStepsType.SKILLS_EXPERIENCE,
    },
    {
      id: 3,
      label: "Education",
      value: SetupUiStepsType.EDUCATION,
    },
    {
      id: 2,
      label: "Certificates & Languages",
      value: SetupUiStepsType.CERTIFICATES_LANGUAGES,
    },
  ];