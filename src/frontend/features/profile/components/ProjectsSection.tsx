import { FolderGit2 } from "lucide-react";
import { EmptyProject } from "../lib/profile-form";
import { useArrayField } from "../lib/use-array-field";
import { ProjectItem } from "./ProjectItem";
import { RepeatableSection } from "./RepeatableSection";

export const ProjectsSection = () => {
  const { items, add, remove } = useArrayField("projects");

  return (
    <RepeatableSection
      title="Projects"
      description="Side projects and portfolio work. Use “Import from GitHub” to pull them in automatically."
      icon={FolderGit2}
      count={items.length}
      addLabel="Add project"
      emptyTitle="No projects yet"
      onAdd={() => add(EmptyProject())}
    >
      {items.map((_, index) => (
        <ProjectItem key={index} index={index} onRemove={() => remove(index)} />
      ))}
    </RepeatableSection>
  );
};
