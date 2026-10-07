import { useFormikContext } from "formik";
import { Trash2 } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/frontend/components/ui/select";
import { PROFICIENCY_OPTIONS } from "../lib/suggestions";
import type { ProfileFormValues } from "../types";
import { ProfileField } from "./ProfileField";

export const LanguageRow = ({ index, onRemove }: { index: number; onRemove: () => void }) => {
  const { values, setFieldValue } = useFormikContext<ProfileFormValues>();
  const language = values.languages[index];
  if (!language) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_180px_auto] sm:items-end">
      <ProfileField name={`languages.${index}.name`} label="Language" placeholder="English" />
      <div className="grid gap-2">
        <span className="text-sm font-medium">Proficiency</span>
        <Select
          value={language.proficiency || undefined}
          onValueChange={(value) => setFieldValue(`languages.${index}.proficiency`, value)}
        >
          <SelectTrigger aria-label="Proficiency" className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {PROFICIENCY_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={onRemove}
        aria-label={`Remove ${language.name || "language"}`}
      >
        <Trash2 />
      </Button>
    </div>
  );
};
