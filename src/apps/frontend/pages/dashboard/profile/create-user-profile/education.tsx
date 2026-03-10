import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { Button, FormControl, Input, Text } from "../../../../components";
import type { UserEducation } from "../../../../types";
import {
  profileDeleteIconButtonClass,
  profileIconButtonClass,
  profileItemCardClass,
  profileItemHeaderClass,
  profileSectionClass,
  profileSectionHeaderClass,
  profileStepContainerClass,
} from "./create-user-profile-ui";

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
    <div className={profileStepContainerClass}>
      <section className={profileSectionClass}>
        <div className={profileSectionHeaderClass}>
          <Text font="ParagraphLarge">Education</Text>
          <div className="w-fit">
            <Button onClick={handleAddNewEducation}>
              <Plus size={16} className="mr-1" /> Add Education
            </Button>
          </div>
        </div>
        {educations.map((education, index) => (
          <div key={`education-${index}`} className={profileItemCardClass}>
            <div className={profileItemHeaderClass}>
              <Text font="LabelLarge">Education {index + 1}</Text>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleEducation(index)}
                  className={profileIconButtonClass}
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
                </button>
                <button
                  type="button"
                  className={profileDeleteIconButtonClass}
                  onClick={() => {
                    handleDeleteEducation(index);
                  }}
                  aria-label={`Delete education ${index + 1}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <FormControl label="Institution" error="">
                <Input
                  placeholder="University of Technology"
                  value={education.institution}
                  onChange={(e) =>
                    handleUpdateEducation(
                      index,
                      "institution",
                      e.target.value,
                    )
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
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedEducationIndices.includes(index)
                  ? "max-h-[700px] border-t border-slate-200 pt-5 dark:border-gray-700"
                  : "max-h-0"
              }`}
            >
              <div className="space-y-4">
                <FormControl label="Field of Study" error="">
                  <Input
                    placeholder="Computer Science"
                    value={education.fieldOfStudy}
                    onChange={(e) =>
                      handleUpdateEducation(
                        index,
                        "fieldOfStudy",
                        e.target.value,
                      )
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
                        handleUpdateEducation(
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
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Education;
