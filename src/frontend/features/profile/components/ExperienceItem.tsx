import { useFormikContext } from "formik";
import { Checkbox } from "@/frontend/components/ui/checkbox";
import { Label } from "@/frontend/components/ui/label";
import { DOMAIN_SUGGESTIONS, SKILL_SUGGESTIONS } from "../lib/suggestions";
import type { ProfileFormValues } from "../types";
import { ItemCard } from "./ItemCard";
import { ProfileField } from "./ProfileField";
import { TagField } from "./TagField";

export const ExperienceItem = ({ index, onRemove }: { index: number; onRemove: () => void }) => {
  const { values, setFieldValue } = useFormikContext<ProfileFormValues>();
  const item = values.experience[index];
  const name = `experience.${index}`;
  if (!item) return null;

  return (
    <ItemCard
      title={item.role || "New role"}
      subtitle={item.company}
      onRemove={onRemove}
      removeLabel={`Remove ${item.role || "this role"}`}
    >
      <ProfileField name={`${name}.role`} label="Role" placeholder="Frontend Engineer" />
      <ProfileField name={`${name}.company`} label="Company" placeholder="Acme Inc." />
      <ProfileField name={`${name}.startDate`} label="Start" type="month" />
      <ProfileField name={`${name}.endDate`} label="End" type="month" disabled={item.isCurrent} />
      <div className="flex items-center gap-2 sm:col-span-2">
        <Checkbox
          id={`${name}-current`}
          checked={item.isCurrent}
          onCheckedChange={(checked) => {
            setFieldValue(`${name}.isCurrent`, checked === true);
            if (checked === true) setFieldValue(`${name}.endDate`, "");
          }}
        />
        <Label htmlFor={`${name}-current`} className="font-normal">
          I currently work here
        </Label>
      </div>
      <ProfileField
        name={`${name}.description`}
        label="What you did"
        placeholder="Owned the analytics dashboard; cut load time by 35% with code splitting."
        multiline
        rows={3}
        maxLength={2000}
        optional
        className="sm:col-span-2"
      />
      <TagField name={`${name}.skillAchieved`} label="Skills used" placeholder="React, Node.js…" suggestions={SKILL_SUGGESTIONS} />
      <TagField name={`${name}.domainsWorked`} label="Domains" placeholder="SaaS, Fintech…" suggestions={DOMAIN_SUGGESTIONS} />
    </ItemCard>
  );
};
