import {
  Briefcase,
  ChevronDown,
  Code,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  Button,
  FormControl,
  Input,
} from "../../../../components";
import { ButtonType } from "../../../../types/button";
import type {
  Skills,
  UserExperience,
  UserProjects,
} from "../../../../types/user-profile";
import ProfileCreatorCards from "../../../../components/profile-builder-ui";
import { ProfileDeleteIconButton, ProfileIconButton, ProfileItemCard, ProfileItemHeader } from "../../../../components/profile-builder-ui/extra-profile-cards";
import { ExpandableCard } from "../../../../components/profile-builder-ui/expandable-card";
import Select from "../../../../components/select";
import { UserSkillLevelData, userSkillRatingData, UserSkillsData } from "../../../../constants";

interface SkillsAndExperienceProps {
  skills: Skills[];
  handleAddNewSkills: () => void;
  handleUpdateSkill: (
    index: number,
    field: keyof Skills,
    value: string,
  ) => void;
  handleDeleteSkill: (index: number) => void;
  handleAddNewExperience: () => void;
  handleUpdateExperience: (
    index: number,
    field: keyof UserExperience,
    value: string | Date | string[],
  ) => void;
  handleDeleteExperience: (index: number) => void;
  toggleExperience: (index: number) => void;
  expandedExperienceIndices: number[];
  experiences: UserExperience[];
  handleAddNewProject: () => void;
  handleUpdateProject: (
    index: number,
    field: keyof UserProjects,
    value: string,
  ) => void;
  handleDeleteProject: (index: number) => void;
  toggleProject: (index: number) => void;
  expandedProjectIndices: number[];
  projects: UserProjects[];
}

const SkillsAndExperience: React.FC<SkillsAndExperienceProps> = ({
  skills,
  handleAddNewSkills,
  handleUpdateSkill,
  handleDeleteSkill,
  handleAddNewExperience,
  handleUpdateExperience,
  handleDeleteExperience,
  toggleExperience,
  expandedExperienceIndices,
  experiences,
  handleAddNewProject,
  handleUpdateProject,
  handleDeleteProject,
  toggleProject,
  expandedProjectIndices,
  projects,
}) => {
  const getCommaSeparatedDraftValues = (value: string) =>
    value.split(",").map((item) => item.trimStart());

  const getNormalizedCommaSeparatedValues = (values: string[]) =>
    values.map((item) => item.trim()).filter(Boolean);

  return (
    <div className="flex flex-col gap-5">
      <ProfileCreatorCards
        badge={
          <>
            <Code size={14} />
            Capability Stack
          </>
        }
        title="Skills"
        description="Highlight your strongest technologies and rate them clearly so the profile instantly communicates your strengths."
        stat={
          <>
            <Sparkles size={16} />
            {skills.length} Added
          </>
        }
        action={
          <Button type={ButtonType.BUTTON} onClick={handleAddNewSkills}>
            <Plus size={16} className="mr-1" /> Add Skill
          </Button>
        }
      >
        {skills.map((skill, index) => (
          <div
            key={`skill-${index}`}
            className="flex flex-col gap-2 rounded-xl sm:flex-row sm:items-center"
          >
            <div className="grid w-full flex-1 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Select
                  value={skill.name}
                  options={UserSkillsData}
                  handleChange={(e) => handleUpdateSkill(index, "name", e.target.value)}
                  isLoading={false}
                />
              </div>
              <div className="lg:col-span-4">
                <Select
                  value={skill.level}
                  options={UserSkillLevelData}
                  handleChange={(e) => handleUpdateSkill(index, "level", e.target.value)}
                  isLoading={false}
                />
              </div>
              <div className="sm:max-w-32 lg:col-span-3 lg:max-w-none">
                <Select
                  value={skill.rating}
                  options={userSkillRatingData}
                  handleChange={(e) => handleUpdateSkill(index, "rating", e.target.value)}
                  isLoading={false}
                />
              </div>
            </div>
            <ProfileDeleteIconButton
              className="h-9 w-9 shrink-0 self-end sm:self-center"
              onClick={() => handleDeleteSkill(index)}
              aria-label={`Delete skill ${index + 1}`}
            >
              <Trash2 size={18} />
            </ProfileDeleteIconButton>
          </div>
        ))}
      </ProfileCreatorCards>
      <ProfileCreatorCards
        badge={
          <>
            <Briefcase size={14} />
            Work History
          </>
        }
        title="Experience"
        description="Keep your experience cards concise on top, then expand them to add dates, achieved skills, and domains worked."
        stat={
          <>
            <Sparkles size={16} />
            {experiences.length} Added
          </>
        }
        action={
          <Button type={ButtonType.BUTTON} onClick={handleAddNewExperience}>
            <Plus size={16} className="mr-1" /> Add Experience
          </Button>
        }
      >
        {experiences.map((experience, index) => (
          <ProfileItemCard key={`experience-${index}`}>
            <ProfileItemHeader
              title={`Experience ${index + 1}`}
              actions={
                <div className="flex items-center gap-2">
                  <ProfileIconButton
                    onClick={() => toggleExperience(index)}
                    aria-label={`Toggle experience ${index + 1}`}
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${
                        expandedExperienceIndices.includes(index)
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </ProfileIconButton>
                  <ProfileDeleteIconButton
                    onClick={() => handleDeleteExperience(index)}
                    aria-label={`Delete experience ${index + 1}`}
                  >
                    <Trash2 size={20} />
                  </ProfileDeleteIconButton>
                </div>
              }
            />
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <FormControl label="Company" error="">
                <Input
                  placeholder="Tech Solutions Inc."
                  value={experience.company}
                  onChange={(e) => {
                    handleUpdateExperience(index, "company", e.target.value);
                  }}
                />
              </FormControl>
              <FormControl label="Role" error="">
                <Input
                  placeholder="Senior Frontend Engineer"
                  value={experience.role}
                  onChange={(e) => {
                    handleUpdateExperience(index, "role", e.target.value);
                  }}
                />
              </FormControl>
            </div>
            <ExpandableCard isExpanded={expandedExperienceIndices.includes(index)}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormControl label="Start Date" error="">
                    <Input
                      type="date"
                      value={
                        experience.startDate instanceof Date
                          ? experience.startDate.toISOString().split("T")[0]
                          : experience.startDate
                      }
                      onChange={(e) =>
                        handleUpdateExperience(
                          index,
                          "startDate",
                          e.target.value,
                        )
                      }
                    />
                  </FormControl>
                  <FormControl label="End Date" error="">
                    <Input
                      type="date"
                      value={
                        experience.endDate instanceof Date
                          ? experience.endDate.toISOString().split("T")[0]
                          : experience.endDate
                      }
                      onChange={(e) => {
                        handleUpdateExperience(
                          index,
                          "endDate",
                          e.target.value,
                        );
                      }}
                    />
                  </FormControl>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <FormControl
                    label="Skills Achieved (Comma separated)"
                    error=""
                  >
                    <Input
                      placeholder="React, Redux, TypeScript"
                      value={experience.skillAchieved.join(", ")}
                      onChange={(e) =>
                        handleUpdateExperience(
                          index,
                          "skillAchieved",
                          getCommaSeparatedDraftValues(e.target.value),
                        )
                      }
                      onBlur={() =>
                        handleUpdateExperience(
                          index,
                          "skillAchieved",
                          getNormalizedCommaSeparatedValues(
                            experience.skillAchieved,
                          ),
                        )
                      }
                    />
                  </FormControl>
                  <FormControl
                    label="Domains Worked (Comma separated)"
                    error=""
                  >
                    <Input
                      placeholder="Fintech, SaaS"
                      value={experience.domainsWorked.join(", ")}
                      onChange={(e) =>
                        handleUpdateExperience(
                          index,
                          "domainsWorked",
                          getCommaSeparatedDraftValues(e.target.value),
                        )
                      }
                      onBlur={() =>
                        handleUpdateExperience(
                          index,
                          "domainsWorked",
                          getNormalizedCommaSeparatedValues(
                            experience.domainsWorked,
                          ),
                        )
                      }
                    />
                  </FormControl>
                </div>
              </div>
            </ExpandableCard>
          </ProfileItemCard>
        ))}
      </ProfileCreatorCards>
      <ProfileCreatorCards
        badge={
          <>
            <Sparkles size={14} />
            Showcase Work
          </>
        }
        title="Projects"
        description="Add project titles, a short explanation, and a clean public link so your work is easy to review."
        stat={
          <>
            <Sparkles size={16} />
            {projects.length} Added
          </>
        }
        action={
          <Button type={ButtonType.BUTTON} onClick={handleAddNewProject}>
            <Plus size={16} className="mr-1" /> Add Project
          </Button>
        }
      >
        {projects.map((project, index) => (
          <ProfileItemCard key={`project-${index}`}>
            <ProfileItemHeader
              title={`Project ${index + 1}`}
              actions={
                <div className="flex items-center gap-2">
                  <ProfileIconButton
                    onClick={() => toggleProject(index)}
                    aria-label={`Toggle project ${index + 1}`}
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${
                        expandedProjectIndices.includes(index)
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </ProfileIconButton>
                  <ProfileDeleteIconButton
                    onClick={() => handleDeleteProject(index)}
                    aria-label={`Delete project ${index + 1}`}
                  >
                    <Trash2 size={20} />
                  </ProfileDeleteIconButton>
                </div>
              }
            />
            <FormControl label="Project Title" error="">
              <Input
                placeholder="Skill Sphere"
                value={project.title}
                onChange={(e) =>
                  handleUpdateProject(index, "title", e.target.value)
                }
              />
            </FormControl>
            <ExpandableCard
              isExpanded={expandedProjectIndices.includes(index)}
            >
              <div className="space-y-4">
                <FormControl label="Description" error="">
                  <Input
                    placeholder="A comprehensive platform..."
                    value={project.description}
                    onChange={(e) =>
                      handleUpdateProject(index, "description", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl label="Link" error="">
                  <Input
                    placeholder="https://github.com/..."
                    value={project.link}
                    onChange={(e) =>
                      handleUpdateProject(index, "link", e.target.value)
                    }
                  />
                </FormControl>
              </div>
            </ExpandableCard>
          </ProfileItemCard>
        ))}
      </ProfileCreatorCards>
    </div>
  );
};

export default SkillsAndExperience;
