import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Label } from "@/frontend/components/ui/label";
import { Switch } from "@/frontend/components/ui/switch";
import { Cn } from "@/frontend/lib/utils";
import { ACCENT_COLORS, SECTION_LABELS, TEMPLATES } from "../lib/resume-options";
import type { ResumeOptionsType, ResumeSectionTypeEnum } from "../types";

type ResumeOptionsPanelProps = {
  options: ResumeOptionsType;
  onChange: (options: ResumeOptionsType) => void;
};

export const ResumeOptionsPanel = ({ options, onChange }: ResumeOptionsPanelProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">Design</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm font-medium">Template</legend>
        {TEMPLATES.map((template) => (
          <button
            key={template.value}
            type="button"
            aria-pressed={options.template === template.value}
            onClick={() => onChange({ ...options, template: template.value })}
            className={Cn(
              "w-full rounded-lg border p-3 text-left transition-colors hover:bg-accent",
              options.template === template.value && "border-primary bg-primary/5 ring-1 ring-primary",
            )}
          >
            <p className="font-medium">{template.label}</p>
            <p className="text-xs text-muted-foreground">{template.description}</p>
          </button>
        ))}
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">Accent colour</legend>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              aria-label={color.label}
              aria-pressed={options.accent === color.value}
              onClick={() => onChange({ ...options, accent: color.value })}
              className="flex size-8 items-center justify-center rounded-full ring-offset-2 ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{ backgroundColor: color.value }}
            >
              {options.accent === color.value && <Check className="size-4 text-white" />}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="mb-2 text-sm font-medium">Sections</legend>
        {(Object.keys(SECTION_LABELS) as ResumeSectionTypeEnum[]).map((section) => (
          <div key={section} className="flex items-center justify-between">
            <Label htmlFor={`section-${section}`} className="font-normal">
              {SECTION_LABELS[section]}
            </Label>
            <Switch
              id={`section-${section}`}
              checked={options.sections[section]}
              onCheckedChange={(checked) =>
                onChange({ ...options, sections: { ...options.sections, [section]: checked } })
              }
            />
          </div>
        ))}
      </fieldset>
    </CardContent>
  </Card>
);
