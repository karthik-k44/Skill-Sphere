import { GraduationCap } from "lucide-react";
import { EmptyEducation } from "../lib/profile-form";
import { useArrayField } from "../lib/use-array-field";
import { EducationItem } from "./EducationItem";
import { RepeatableSection } from "./RepeatableSection";

export const EducationSection = () => {
  const { items, add, remove } = useArrayField("education");

  return (
    <RepeatableSection
      title="Education"
      description="Degrees, diplomas and bootcamps."
      icon={GraduationCap}
      count={items.length}
      addLabel="Add education"
      emptyTitle="No education added"
      onAdd={() => add(EmptyEducation())}
    >
      {items.map((_, index) => (
        <EducationItem key={index} index={index} onRemove={() => remove(index)} />
      ))}
    </RepeatableSection>
  );
};
