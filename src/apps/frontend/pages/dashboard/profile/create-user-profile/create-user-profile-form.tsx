import React, { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
} from "lucide-react";
import {
  FormControl,
  Input,
  Button,
  ProfileSection,
  ProfileSectionHeader,
  ProfileSectionHint,
  ProfileStepLayout,
  Text,
} from "../../../../components";
import { ButtonKind, ButtonType } from "../../../../types/button";
import CreateUserFormHook from "./create-user-form-hook";
import {
  UserProfileFormType,
  type UserCertifications,
  type Skills,
  type UserEducation,
  type UserExperience,
  type UserInterests,
  type UserLanguages,
  type UserProjects,
  type UserProfileResponse,
} from "../../../../types/user-profile";
import toast from "react-hot-toast";
import {
  SETUP_UI_STEPS,
  SetupUiStepsType,
  type StepType,
} from "../../../../types/stepper";
import Stepper from "../../../../components/stepper";
import SkillsAndExperience from "./skills-and-experience";
import Education from "./education";
import CertificatesAndLanguages from "./certificates-and-languages";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes/types";

interface CreateUserProfileFormProps {
  formType: UserProfileFormType;
  userProfileData?: UserProfileResponse;
}

const CreateUserProfileForm: React.FC<CreateUserProfileFormProps> = ({
  formType,
  userProfileData
}) => {
  const navigate = useNavigate();
  const [expandedExperienceIndices, setExpandedExperienceIndices] = useState<number[]>([]);
  const [expandedEducationIndices, setExpandedEducationIndices] = useState<number[]>([]);
  const [expandedProjectIndices, setExpandedProjectIndices] = useState<number[]>([]);
  const [skills, setSkills] = useState<Skills[]>([
    {
      name: "",
      level: "",
      rating: "",
    },
  ]);
  const [experiences, setExperiences] = useState<UserExperience[]>([
    {
      company: "",
      role: "",
      startDate: new Date(),
      endDate: new Date(),
      skillAchieved: [],
      domainsWorked: [],
    },
  ]);
  const [educations, setEducations] = useState<UserEducation[]>([
    {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);
  const [projects, setProjects] = useState<UserProjects[]>([
    {
      title: "",
      description: "",
      link: "",
    },
  ]);
  const [certifications, setCertifications] = useState<UserCertifications[]>([
    {
      name: "",
      link: "",
    },
  ]);
  const [languages, setLanguages] = useState<UserLanguages[]>([
    {
      name: "",
      proficiency: "",
    },
  ]);
  const [interests, setInterests] = useState<UserInterests[]>([{ name: "" }]);

  const [currentStep, setCurrentStep] = useState<StepType>(
    SETUP_UI_STEPS[0],
  );

  const handleNavigation = (value: SetupUiStepsType) => {
    const step = SETUP_UI_STEPS.find((step) => step.value === value);
    if (step) {
      setCurrentStep(step);
    }
  };

  const userProfileIsEmpty = !userProfileData || Object.keys(userProfileData || {}).length === 0

  const formSuccess = () => {
    if (formType === UserProfileFormType.CREATE) {
      setSkills([{ name: "", level: "", rating: "" }]);
      setExperiences([
        { company: "", role: "", startDate: new Date(), endDate: new Date(), skillAchieved: [], domainsWorked: [] },
      ]);
      setEducations([
        { institution: "", degree: "", fieldOfStudy: "", startDate: new Date(), endDate: new Date() },
      ]);
      setProjects([{ title: "", description: "", link: "" }]);
      setCertifications([{ name: "", link: "" }]);
      setLanguages([{ name: "", proficiency: "" }]);
      setInterests([{ name: "" }]);
      navigate(ROUTES.DASHBOARD);
                
    }
    if (formType === UserProfileFormType.UPDATE) {
      navigate(ROUTES.DASHBOARD);
    }
  }

  const formik = CreateUserFormHook({
    formType,
    userProfileData,
    formSuccess,
  });

  const showFieldError = (
    fieldName: "phoneNumber" | "streetAddress" | "city" | "state" | "country",
  ) => {
    const error = formik.errors[fieldName];
    const touched = formik.touched[fieldName];

    return touched && typeof error === "string" ? error : "";
  };

  const hasText = (value?: string) => Boolean(value?.trim());

  const shouldValidateSkills =
    skills.length > 1 || skills.some((skill) => hasText(skill.name) || hasText(skill.level) || hasText(skill.rating));
  const hasIncompleteSkills =
    shouldValidateSkills &&
    skills.some((skill) => !hasText(skill.name) || !hasText(skill.level) || !hasText(skill.rating));

  const shouldValidateExperiences =
    experiences.length > 1 ||
    experiences.some(
      (experience) =>
        hasText(experience.company) ||
        hasText(experience.role) ||
        (experience.skillAchieved || []).length > 0 ||
        (experience.domainsWorked || []).length > 0,
    );
  const hasIncompleteExperiences =
    shouldValidateExperiences &&
    experiences.some((experience) => !hasText(experience.company) || !hasText(experience.role));

  const shouldValidateEducation =
    educations.length > 1 ||
    educations.some(
      (education) =>
        hasText(education.institution) ||
        hasText(education.degree) ||
        hasText(education.fieldOfStudy),
    );
  const hasIncompleteEducation =
    shouldValidateEducation &&
    educations.some(
      (education) =>
        !hasText(education.institution) ||
        !hasText(education.degree) ||
        !hasText(education.fieldOfStudy),
    );

  const shouldValidateProjects =
    projects.length > 1 ||
    projects.some(
      (project) =>
        hasText(project.title) || hasText(project.description) || hasText(project.link),
    );
  const hasIncompleteProjects =
    shouldValidateProjects &&
    projects.some(
      (project) =>
        !hasText(project.title) || !hasText(project.description) || !hasText(project.link),
    );

  const shouldValidateCertifications =
    certifications.length > 1 ||
    certifications.some(
      (certification) =>
        hasText(certification.name) || hasText(certification.link),
    );
  const hasIncompleteCertifications =
    shouldValidateCertifications &&
    certifications.some(
      (certification) =>
        !hasText(certification.name) || !hasText(certification.link),
    );

  const shouldValidateLanguages =
    languages.length > 1 ||
    languages.some(
      (language) =>
        hasText(language.name) || hasText(language.proficiency),
    );
  const hasIncompleteLanguages =
    shouldValidateLanguages &&
    languages.some(
      (language) =>
        !hasText(language.name) || !hasText(language.proficiency),
    );

  const shouldValidateInterests =
    interests.length > 1 ||
    interests.some((interest) => hasText(interest.name));
  const hasIncompleteInterests =
    shouldValidateInterests &&
    interests.some((interest) => !hasText(interest.name));

  const handleFinalSubmit = async () => {
    const errors = await formik.validateForm();

    await formik.setTouched({
      phoneNumber: true,
      streetAddress: true,
      city: true,
      state: true,
      country: true,
      zipCode: true,
    });

    const hasContactErrors = Boolean(
      errors.phoneNumber ||
      errors.streetAddress ||
      errors.city ||
      errors.state ||
      errors.country ||
      errors.zipCode,
    );

    if (hasContactErrors) {
      handleNavigation(SetupUiStepsType.CONTACT_ADDRESS);
      toast.error("Please complete the Contact & Address step before submitting.");
      return;
    }

    if (hasIncompleteSkills) {
      handleNavigation(SetupUiStepsType.SKILLS_EXPERIENCE);
      toast.error("Please complete all added skill fields before submitting.");
      return;
    }

    if (hasIncompleteExperiences) {
      handleNavigation(SetupUiStepsType.SKILLS_EXPERIENCE);
      toast.error("Please complete all added experience fields before submitting.");
      return;
    }

    if (hasIncompleteProjects) {
      handleNavigation(SetupUiStepsType.SKILLS_EXPERIENCE);
      toast.error("Please complete all added project fields before submitting.");
      return;
    }

    if (hasIncompleteEducation) {
      handleNavigation(SetupUiStepsType.EDUCATION);
      toast.error("Please complete all added education fields before submitting.");
      return;
    }

    if (hasIncompleteCertifications) {
      handleNavigation(SetupUiStepsType.CERTIFICATES_LANGUAGES);
      toast.error("Please complete all added certification fields before submitting.");
      return;
    }

    if (hasIncompleteLanguages) {
      handleNavigation(SetupUiStepsType.CERTIFICATES_LANGUAGES);
      toast.error("Please complete all added language fields before submitting.");
      return;
    }

    if (hasIncompleteInterests) {
      handleNavigation(SetupUiStepsType.CERTIFICATES_LANGUAGES);
      toast.error("Please complete all added interest fields before submitting.");
      return;
    }

    await formik.submitForm();
  };

  useEffect(() => {
    if (formType === UserProfileFormType.UPDATE && !userProfileIsEmpty) {
      setSkills(
        (userProfileData?.skills || []).map((skill) => ({
          ...skill,
        })),
      );
      setExperiences(
        (userProfileData?.experience || []).map((experience) => ({
          ...experience,
          startDate: experience?.startDate ? new Date(experience.startDate) : new Date(),
          endDate: experience?.endDate ? new Date(experience.endDate) : new Date(),
          skillAchieved: [...(experience?.skillAchieved || [])],
          domainsWorked: [...(experience?.domainsWorked || [])],
        })),
      );
      setEducations(
        (userProfileData?.education || []).map((education) => ({
          ...education,
          startDate: education?.startDate ? new Date(education.startDate) : new Date(),
          endDate: education?.endDate ? new Date(education.endDate) : new Date(),
        })),
      );
      setProjects(
        (userProfileData?.projects || []).map((project) => ({
          ...project,
        })),
      );
      setCertifications(
        (userProfileData?.certifications || []).map((certification) => ({
          ...certification,
        })),
      );
      setLanguages(
        (userProfileData?.languages || []).map((language) => ({
          ...language,
        })),
      );
      setInterests(
        (userProfileData?.interests || []).map((interest) => ({
          ...interest,
        })),
      );
    }
  }, [formType, userProfileData, userProfileIsEmpty]);

  useEffect(() => {
    formik.setFieldValue("skills", skills).catch(() => {});
    formik.setFieldValue("experience", experiences).catch(() => {});
    formik.setFieldValue("education", educations).catch(() => {});
    formik.setFieldValue("projects", projects).catch(() => {});
    formik.setFieldValue("certifications", certifications).catch(() => {});
    formik.setFieldValue("languages", languages).catch(() => {});
    formik.setFieldValue("interests", interests).catch(() => {});
  }, [
    skills,
    experiences,
    educations,
    projects,
    certifications,
    languages,
    interests,
  ]);

  const toggleExperience = (index: number) => {
    setExpandedExperienceIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const toggleEducation = (index: number) => {
    setExpandedEducationIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const toggleProject = (index: number) => {
    setExpandedProjectIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleAddNewSkills = () => {
    setSkills([...skills, { name: "", level: "", rating: "" }]);
  };

  const handleUpdateSkill = (
    index: number,
    field: keyof Skills,
    value: string,
  ) => {
    const newSkills = [...skills];
    if (field) {
      newSkills[index][field] = value;
    }
    setSkills(newSkills);
  };

  const handleDeleteSkill = (index: number) => {
    if (skills.length === 1) {
      toast.error("At least one skill is required");
      return;
    }
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleAddNewExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        role: "",
        startDate: new Date(),
        endDate: new Date(),
        skillAchieved: [],
        domainsWorked: [],
      },
    ]);
  };

  const handleUpdateExperience = (
    index: number,
    field: keyof UserExperience,
    value: string | Date | string[],
  ) => {
    const newExperience = [...experiences];
    if (field) {
      (newExperience[index][field] as unknown) = value;
    }
    setExperiences(newExperience);
  };

  const handleDeleteExperience = (index: number) => {
    if (experiences.length === 1) {
      toast.error("At least one Experience is required");
      return;
    }
    const newExperience = [...experiences];
    newExperience.splice(index, 1);
    setExperiences(newExperience);
    setExpandedExperienceIndices((prev) =>
      prev
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i)),
    );
  };

  const handleAddNewEducation = () => {
    setEducations([
      ...educations,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: new Date(),
        endDate: new Date(),
      },
    ]);
  };

  const handleUpdateEducation = (
    index: number,
    field: keyof UserEducation,
    value: string | Date,
  ) => {
    const newEducation = [...educations];
    if (field) {
      (newEducation[index][field] as unknown) = value;
    }
    setEducations(newEducation);
  };

  const handleDeleteEducation = (index: number) => {
    if (educations.length === 1) {
      toast.error("At least one Education is required");
      return;
    }
    const newEducation = [...educations];
    newEducation.splice(index, 1);
    setEducations(newEducation);
    setExpandedEducationIndices((prev) =>
      prev
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i)),
    );
  };

  const handleAddNewProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        link: "",
      },
    ]);
  };

  const handleUpdateProject = (
    index: number,
    field: keyof UserProjects,
    value: string,
  ) => {
    const newProject = [...projects];
    if (field) {
      newProject[index][field] = value;
    }
    setProjects(newProject);
  };

  const handleDeleteProject = (index: number) => {
    if (projects.length === 1) {
      toast.error("At least one Project is required");
      return;
    }
    const newProject = [...projects];
    newProject.splice(index, 1);
    setProjects(newProject);
    setExpandedProjectIndices((prev) =>
      prev
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i)),
    );
  };

  const handleAddNewCertification = () => {
    setCertifications([
      ...certifications,
      {
        name: "",
        link: "",
      },
    ]);
  };

  const handleUpdateCertification = (
    index: number,
    field: keyof UserCertifications,
    value: string,
  ) => {
    const newCertification = [...certifications];
    if (field) {
      newCertification[index][field] = value;
    }
    setCertifications(newCertification);
  };

  const handleDeleteCertification = (index: number) => {
    if (certifications.length === 1) {
      toast.error("At least one Certification is required");
      return;
    }
    const newCertification = [...certifications];
    newCertification.splice(index, 1);
    setCertifications(newCertification);
  };

  const handleAddNewLanguage = () => {
    setLanguages([
      ...languages,
      {
        name: "",
        proficiency: "",
      },
    ]);
  };

  const handleUpdateLanguage = (
    index: number,
    field: keyof UserLanguages,
    value: string,
  ) => {
    const newLanguage = [...languages];
    if (field) {
      newLanguage[index][field] = value;
    }
    setLanguages(newLanguage);
  };

  const handleDeleteLanguage = (index: number) => {
    if (languages.length === 1) {
      toast.error("At least one Language is required");
      return;
    }
    const newLanguage = [...languages];
    newLanguage.splice(index, 1);
    setLanguages(newLanguage);
  };

  const handleAddNewInterest = () => {
    setInterests([...interests, { name: "" }]);
  };

  const handleUpdateInterest = (
    index: number,
    field: keyof UserInterests,
    value: string,
  ) => {
    const newInterest = [...interests];
    if (field) {
      newInterest[index][field] = value;
    }
    setInterests(newInterest);
  };

  const handleDeleteInterest = (index: number) => {
    if (interests.length === 1) {
      toast.error("At least one Interest is required");
      return;
    }
    const newInterest = [...interests];
    newInterest.splice(index, 1);
    setInterests(newInterest);
  };

  return (
    <form
      className="mx-auto flex w-full flex-col gap-8 overflow-y-auto"
      onSubmit={formik.handleSubmit}
    >
      <div className="rounded-[2rem] border border-primary-100 bg-white/80 p-4 shadow-[0_22px_60px_-36px_rgba(37,99,235,0.32)] backdrop-blur sm:p-6">
        <Stepper
          steps={SETUP_UI_STEPS}
          currentStep={currentStep}
          handleChangeStep={handleNavigation}
        >
          {currentStep.value === SetupUiStepsType.CONTACT_ADDRESS && (
            <ProfileStepLayout>
              <ProfileSection>
                <ProfileSectionHeader
                  badge={
                    <>
                      <Phone size={14} />
                      Essential Details
                    </>
                  }
                  title={<Text font="ParagraphLarge">Contact & Address</Text>}
                  description="Add the profile details that power your dashboard, resume, and future analysis features."
                  stat={
                    <>
                      <MapPin size={16} />
                      Required Step
                    </>
                  }
                />

                <ProfileSectionHint>
                  A valid phone number and accurate address make the profile feel
                  complete and help keep future profile exports consistent.
                </ProfileSectionHint>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
                  <div className="xl:col-span-2">
                    <FormControl
                      label="Phone Number"
                      error={showFieldError("phoneNumber")}
                    >
                      <Input
                        name="phoneNumber"
                        placeholder="9875213456"
                        type="tel"
                        inputMode="numeric"
                        value={formik.values.phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                          formik.setFieldValue("phoneNumber", value).catch(() => {});
                        }}
                        onBlur={formik.handleBlur}
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </FormControl>
                  </div>
                  <div className="xl:col-span-4">
                    <FormControl
                      label="Street Address"
                      error={showFieldError("streetAddress")}
                    >
                      <Input
                        name="streetAddress"
                        placeholder="123 Main St"
                        value={formik.values.streetAddress}
                        onChange={formik.handleChange("streetAddress")}
                        onBlur={formik.handleBlur}
                      />
                    </FormControl>
                  </div>
                  <div className="xl:col-span-2">
                    <FormControl
                      label="City"
                      error={showFieldError("city")}
                    >
                      <Input
                        name="city"
                        placeholder="San Francisco"
                        value={formik.values.city}
                        onChange={formik.handleChange("city")}
                        onBlur={formik.handleBlur}
                      />
                    </FormControl>
                  </div>
                  <div className="xl:col-span-1">
                    <FormControl
                      label="State"
                      error={showFieldError("state")}
                    >
                      <Input
                        name="state"
                        placeholder="CA"
                        value={formik.values.state}
                        onChange={formik.handleChange("state")}
                        onBlur={formik.handleBlur}
                      />
                    </FormControl>
                  </div>
                  <div className="xl:col-span-2">
                    <FormControl
                      label="Country"
                      error={showFieldError("country")}
                    >
                      <Input
                        name="country"
                        placeholder="India"
                        value={formik.values.country}
                        onChange={formik.handleChange("country")}
                        onBlur={formik.handleBlur}
                      />
                    </FormControl>
                  </div>
                  <div className="xl:col-span-1">
                    <FormControl label="Zip Code" error="">
                      <Input
                        name="zipCode"
                        placeholder="94105"
                        value={formik.values.zipCode}
                        onChange={formik.handleChange("zipCode")}
                        onBlur={formik.handleBlur}
                      />
                    </FormControl>
                  </div>
                </div>
              </ProfileSection>
            </ProfileStepLayout>
          )}

          {currentStep.value === SetupUiStepsType.SKILLS_EXPERIENCE && (
            <SkillsAndExperience
              skills={skills}
              handleAddNewSkills={handleAddNewSkills}
              handleUpdateSkill={handleUpdateSkill}
              handleDeleteSkill={handleDeleteSkill}
              handleAddNewExperience={handleAddNewExperience}
              handleUpdateExperience={handleUpdateExperience}
              handleDeleteExperience={handleDeleteExperience}
              toggleExperience={toggleExperience}
              expandedExperienceIndices={expandedExperienceIndices}
              experiences={experiences}
              handleAddNewProject={handleAddNewProject}
              handleUpdateProject={handleUpdateProject}
              handleDeleteProject={handleDeleteProject}
              toggleProject={toggleProject}
              expandedProjectIndices={expandedProjectIndices}
              projects={projects}
            />
          )}

          {currentStep.value === SetupUiStepsType.EDUCATION && (
            <Education
              handleAddNewEducation={handleAddNewEducation}
              handleUpdateEducation={handleUpdateEducation}
              handleDeleteEducation={handleDeleteEducation}
              toggleEducation={toggleEducation}
              expandedEducationIndices={expandedEducationIndices}
              educations={educations}
            />
          )}

          {currentStep.value === SetupUiStepsType.CERTIFICATES_LANGUAGES && (
            <CertificatesAndLanguages
              handleAddNewCertification={handleAddNewCertification}
              handleUpdateCertification={handleUpdateCertification}
              handleDeleteCertification={handleDeleteCertification}
              handleAddNewLanguage={handleAddNewLanguage}
              handleUpdateLanguage={handleUpdateLanguage}
              handleDeleteLanguage={handleDeleteLanguage}
              handleAddNewInterest={handleAddNewInterest}
              handleUpdateInterest={handleUpdateInterest}
              handleDeleteInterest={handleDeleteInterest}
              certifications={certifications}
              languages={languages}
              interests={interests}
            />
          )}

          {currentStep.value === SetupUiStepsType.CERTIFICATES_LANGUAGES && (
            <div className="mt-4 flex flex-col gap-4 rounded-[1.75rem] border border-primary-100 bg-gradient-to-r from-white to-primary-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-primary-700">
                  Final review
                </p>
                <p className="text-sm text-primary-600">
                  Everything works the same as before. This action will keep all
                  your current create/update behavior and validations.
                </p>
              </div>
              <div className="flex flex-wrap justify-end gap-3">
                <div className="w-fit">
                  <Button
                    kind={ButtonKind.DISCARD}
                    onClick={() =>{ 
                      if(formType === UserProfileFormType.CREATE)
                      {
                        formik.resetForm();
                      } 
                      navigate(ROUTES.DASHBOARD); 
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="w-fit">
                  <Button
                    type={ButtonType.BUTTON}
                    onClick={() => {
                      handleFinalSubmit().catch(() => {});
                    }}
                  >
                    {formType === UserProfileFormType.CREATE ? "Create Profile" : "Update Profile"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Stepper>
      </div>
    </form>
  );
};

export default CreateUserProfileForm;
