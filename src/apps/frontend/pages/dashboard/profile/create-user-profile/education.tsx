import {
  ChevronDown,
  GraduationCap,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  Button,
  FormControl,
  Input,
  ProfileCreatorCards,
} from "../../../../components";
import { ButtonType } from "../../../../types/button";
import type { UserEducation } from "../../../../types";
import { ProfileDeleteIconButton, ProfileIconButton, ProfileItemCard, ProfileItemHeader } from "../../../../components/profile-builder-ui/extra-profile-cards";
import { ExpandableCard } from "../../../../components/profile-builder-ui/expandable-card";

interface EducationProps {
  handleAddNewEducation: () => void;
  handleUpdateEducation: (
    index: number,
    field: keyof UserEducation,
    value: string | Date,
  ) => void;
  handleDeleteEducation: (index: number) => void;
  toggleEducation: (index: number) => void;
  expandedEducationIndices: number[];
  educations: UserEducation[];
}
const Education: React.FC<EducationProps> = ({
  handleAddNewEducation,
  handleUpdateEducation,
  handleDeleteEducation,
  toggleEducation,
  expandedEducationIndices,
  educations,
}) => {
  return (
    <ProfileCreatorCards
      badge={
        <>
          <GraduationCap size={14} />
          Academic Path
        </>
      }
      title="Education"
      description="Keep your academic background clear and structured so your profile shows both practical and educational depth."
      stat={
        <>
          <Sparkles size={16} />
          {educations.length} Added
        </>
      }
      action={
        <Button type={ButtonType.BUTTON} onClick={handleAddNewEducation}>
          <Plus size={16} className="mr-1" /> Add Education
        </Button>
      }
    >
      {educations.map((education, index) => (
        <ProfileItemCard key={`education-${index}`}>
          <ProfileItemHeader
            title={`Education ${index + 1}`}
            actions={
              <div className="flex items-center gap-2">
                <ProfileIconButton
                  onClick={() => toggleEducation(index)}
                  aria-label={`Toggle education ${index + 1}`}
                >
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      expandedEducationIndices.includes(index)
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </ProfileIconButton>
                <ProfileDeleteIconButton
                  onClick={() => {
                    handleDeleteEducation(index);
                  }}
                  aria-label={`Delete education ${index + 1}`}
                >
                  <Trash2 size={20} />
                </ProfileDeleteIconButton>
              </div>
            }
          />
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <FormControl label="Institution" error="">
              <Input
                placeholder="University of Technology"
                value={education.institution}
                onChange={(e) =>
                  handleUpdateEducation(index, "institution", e.target.value)
                }
              />
            </FormControl>
            <FormControl label="Degree" error="">
              <Input
                placeholder="Bachelor of Science"
                value={education.degree}
                onChange={(e) =>
                  handleUpdateEducation(index, "degree", e.target.value)
                }
              />
            </FormControl>
          </div>
          <ExpandableCard isExpanded={expandedEducationIndices.includes(index)}>
            <div className="space-y-4">
              <FormControl label="Field of Study" error="">
                <Input
                  placeholder="Computer Science"
                  value={education.fieldOfStudy}
                  onChange={(e) =>
                    handleUpdateEducation(index, "fieldOfStudy", e.target.value)
                  }
                />
              </FormControl>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormControl label="Start Date" error="">
                  <Input
                    type="date"
                    value={
                      education.startDate instanceof Date
                        ? education.startDate.toISOString().split("T")[0]
                        : education.startDate
                    }
                    onChange={(e) =>
                      handleUpdateEducation(index, "startDate", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl label="End Date" error="">
                  <Input
                    type="date"
                    value={
                      education.endDate instanceof Date
                        ? education.endDate.toISOString().split("T")[0]
                        : education.endDate
                    }
                    onChange={(e) =>
                      handleUpdateEducation(index, "endDate", e.target.value)
                    }
                  />
                </FormControl>
              </div>
            </div>
          </ExpandableCard>
        </ProfileItemCard>
      ))}
    </ProfileCreatorCards>
  );
};

export default Education;
