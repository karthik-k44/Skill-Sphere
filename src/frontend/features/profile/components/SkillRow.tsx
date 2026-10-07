import { getIn, useFormikContext } from "formik";
import { Trash2 } from "lucide-react";
import { RatingInput } from "@/frontend/components/form/RatingInput";
import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/frontend/components/ui/select";
import { SKILL_LEVEL_OPTIONS } from "../lib/suggestions";
import type { ProfileFormValues } from "../types";

type SkillRowProps = { index: number; suggestionsId: string; onRemove: () => void };

export const SkillRow = ({ index, suggestionsId, onRemove }: SkillRowProps) => {
  const formik = useFormikContext<ProfileFormValues>();
  const skill = formik.values.skills[index];
  const name = `skills.${index}`;
  const showError = Boolean(getIn(formik.touched, `${name}.name`)) || formik.submitCount > 0;
  const error = showError ? (getIn(formik.errors, `${name}.name`) as string | undefined) : undefined;

  if (!skill) return null;

  return (
    <div className="grid gap-3 rounded-lg border p-3 sm:grid-cols-[1fr_160px_auto_auto] sm:items-center">
      <div className="space-y-1">
        <Input
          aria-label="Skill name"
          placeholder="e.g. TypeScript"
          list={suggestionsId}
          aria-invalid={Boolean(error)}
          {...formik.getFieldProps(`${name}.name`)}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
      <Select value={skill.level || undefined} onValueChange={(value) => formik.setFieldValue(`${name}.level`, value)}>
        <SelectTrigger aria-label="Skill level" className="w-full">
          <SelectValue placeholder="Level" />
        </SelectTrigger>
        <SelectContent>
          {SKILL_LEVEL_OPTIONS.map((level) => (
            <SelectItem key={level} value={level}>
              {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <RatingInput
        label={`${skill.name || "Skill"} rating`}
        value={skill.rating}
        onChange={(rating) => formik.setFieldValue(`${name}.rating`, rating)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={onRemove}
        aria-label={`Remove ${skill.name || "skill"}`}
      >
        <Trash2 />
      </Button>
    </div>
  );
};
