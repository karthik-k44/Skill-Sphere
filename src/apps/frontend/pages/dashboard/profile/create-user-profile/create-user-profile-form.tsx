import React, { useEffect, useState } from "react";
import {
  FormControl,
  Input,
  Button,
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
import {
  profileSectionClass,
  profileSectionHeaderClass,
  profileStepContainerClass,
} from "./create-user-profile-ui";

interface CreateUserProfileFormProps {
  formType: UserProfileFormType;
}

const CreateUserProfileForm: React.FC<CreateUserProfileFormProps> = ({
  formType,
}) => {
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

  const formik = CreateUserFormHook({
    formType,
  });

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
      className="w-full flex flex-col gap-6 overflow-y-auto"
      onSubmit={formik.handleSubmit}
    >
      <Stepper
        steps={SETUP_UI_STEPS}
        currentStep={currentStep}
        handleChangeStep={handleNavigation}
      >
        {currentStep.value === SetupUiStepsType.CONTACT_ADDRESS && (
          <div className={profileStepContainerClass}>
            <section className={profileSectionClass}>
              <div className={profileSectionHeaderClass}>
                <Text font="ParagraphLarge">Contact & Address</Text>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormControl
                  label="Phone Number"
                  error={
                    formik.errors.phoneNumber && formik.touched.phoneNumber
                      ? formik.errors.phoneNumber
                      : ""
                  }
                >
                  <Input
                    name="phoneNumber"
                    placeholder="9875213456"
                    type="number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange("phoneNumber")}
                    onBlur={formik.handleBlur}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>
                <FormControl
                  label="Street Address"
                  error={
                    formik.errors.streetAddress && formik.touched.streetAddress
                      ? formik.errors.streetAddress
                      : ""
                  }
                >
                  <Input
                    name="streetAddress"
                    placeholder="123 Main St"
                    value={formik.values.streetAddress}
                    onChange={formik.handleChange("streetAddress")}
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
                <FormControl
                  label="City"
                  error={
                    formik.errors.city && formik.touched.city
                      ? formik.errors.city
                      : ""
                  }
                >
                  <Input
                    name="city"
                    placeholder="San Francisco"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
                <FormControl
                  label="State"
                  error={
                    formik.errors.state && formik.touched.state
                      ? formik.errors.state
                      : ""
                  }
                >
                  <Input
                    name="state"
                    placeholder="CA"
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
                <FormControl
                  label="Country"
                  error={
                    formik.errors.country && formik.touched.country
                      ? formik.errors.country
                      : ""
                  }
                >
                  <Input
                    name="country"
                    placeholder="India"
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
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
            </section>
          </div>
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
          <div className="mt-2 flex justify-end gap-4 border-t border-slate-200 pt-6 dark:border-gray-700">
            <div className="w-fit">
              <Button
                kind={ButtonKind.DISCARD}
                onClick={() => formik.resetForm()}
              >
                Cancel
              </Button>
            </div>
            <div className="w-fit">
              <Button type={ButtonType.SUBMIT}>Save Profile</Button>
            </div>
          </div>
        )}
      </Stepper>
    </form>
  );
};

export default CreateUserProfileForm;
