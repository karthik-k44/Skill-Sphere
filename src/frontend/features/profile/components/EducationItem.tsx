import { useFormikContext } from "formik";
import type { ProfileFormValues } from "../types";
import { ItemCard } from "./ItemCard";
import { ProfileField } from "./ProfileField";

export const EducationItem = ({ index, onRemove }: { index: number; onRemove: () => void }) => {
  const { values } = useFormikContext<ProfileFormValues>();
  const item = values.education[index];
  const name = `education.${index}`;
  if (!item) return null;

  return (
    <ItemCard
      title={item.institution || "New education"}
      subtitle={[item.degree, item.fieldOfStudy].filter(Boolean).join(", ")}
      onRemove={onRemove}
      removeLabel={`Remove ${item.institution || "this entry"}`}
    >
      <ProfileField
        name={`${name}.institution`}
        label="Institution"
        placeholder="State Institute of Technology"
        className="sm:col-span-2"
      />
      <ProfileField name={`${name}.degree`} label="Degree" placeholder="B.Tech" optional />
      <ProfileField name={`${name}.fieldOfStudy`} label="Field of study" placeholder="Computer Science" optional />
      <ProfileField name={`${name}.startDate`} label="Start" type="month" optional />
      <ProfileField name={`${name}.endDate`} label="End (or expected)" type="month" optional />
      <ProfileField name={`${name}.grade`} label="Grade" placeholder="8.4 CGPA" optional />
    </ItemCard>
  );
};
