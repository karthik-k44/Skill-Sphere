import { useId } from "react";
import { Plus, Wrench } from "lucide-react";
import { Badge } from "@/frontend/components/ui/badge";
import { EmptySkill } from "../lib/profile-form";
import { POPULAR_SKILLS, SKILL_SUGGESTIONS } from "../lib/suggestions";
import { useArrayField } from "../lib/use-array-field";
import { RepeatableSection } from "./RepeatableSection";
import { SkillRow } from "./SkillRow";

export const SkillsSection = () => {
  const { items, add, remove } = useArrayField("skills");
  const suggestionsId = useId();
  const existing = new Set(items.map((skill) => skill.name.toLowerCase()));
  const quickAdd = POPULAR_SKILLS.filter((skill) => !existing.has(skill.toLowerCase()));

  return (
    <div className="space-y-6">
      <RepeatableSection
        title="Skills"
        description="Rate yourself honestly: 3 means you use it at work without help, 5 means you teach it."
        icon={Wrench}
        count={items.length}
        addLabel="Add skill"
        emptyTitle="No skills yet"
        onAdd={() => add(EmptySkill())}
      >
        {items.map((_, index) => (
          <SkillRow key={index} index={index} suggestionsId={suggestionsId} onRemove={() => remove(index)} />
        ))}
      </RepeatableSection>

      {quickAdd.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Quick add:</span>
          {quickAdd.map((skill) => (
            <Badge key={skill} asChild variant="outline" className="cursor-pointer hover:bg-accent">
              <button type="button" onClick={() => add({ ...EmptySkill(), name: skill })}>
                <Plus /> {skill}
              </button>
            </Badge>
          ))}
        </div>
      )}

      <datalist id={suggestionsId}>
        {SKILL_SUGGESTIONS.map((skill) => (
          <option key={skill} value={skill} />
        ))}
      </datalist>
    </div>
  );
};
