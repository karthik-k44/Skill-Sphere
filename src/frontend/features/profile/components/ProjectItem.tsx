import { useFormikContext } from "formik";
import { SKILL_SUGGESTIONS } from "../lib/suggestions";
import type { ProfileFormValues } from "../types";
import { ItemCard } from "./ItemCard";
import { ProfileField } from "./ProfileField";
import { TagField } from "./TagField";

export const ProjectItem = ({ index, onRemove }: { index: number; onRemove: () => void }) => {
  const { values } = useFormikContext<ProfileFormValues>();
  const item = values.projects[index];
  const name = `projects.${index}`;
  if (!item) return null;

  return (
    <ItemCard
      title={item.title || "New project"}
      subtitle={item.techStack.join(" · ")}
      onRemove={onRemove}
      removeLabel={`Remove ${item.title || "this project"}`}
    >
      <ProfileField name={`${name}.title`} label="Title" placeholder="SkillSphere" />
      <ProfileField name={`${name}.link`} label="Link" type="url" placeholder="https://github.com/you/project" optional />
      <ProfileField
        name={`${name}.description`}
        label="Description"
        placeholder="What it does, what you built, and what you learned."
        multiline
        rows={3}
        maxLength={1500}
        optional
        className="sm:col-span-2"
      />
      <TagField
        name={`${name}.techStack`}
        label="Tech stack"
        placeholder="React, Express…"
        suggestions={SKILL_SUGGESTIONS}
        className="sm:col-span-2"
      />
    </ItemCard>
  );
};
