import { Briefcase } from "lucide-react";
import { EmptyExperience } from "../lib/profile-form";
import { useArrayField } from "../lib/use-array-field";
import { ExperienceItem } from "./ExperienceItem";
import { RepeatableSection } from "./RepeatableSection";

export const ExperienceSection = () => {
  const { items, add, remove } = useArrayField("experience");

  return (
    <RepeatableSection
      title="Experience"
      description="Jobs, internships and freelance work. Mention outcomes, not just duties."
      icon={Briefcase}
      count={items.length}
      addLabel="Add role"
      emptyTitle="No experience added"
      onAdd={() => add(EmptyExperience())}
    >
      {items.map((_, index) => (
        <ExperienceItem key={index} index={index} onRemove={() => remove(index)} />
      ))}
    </RepeatableSection>
  );
};
