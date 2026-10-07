import { useFormikContext } from "formik";
import type { ProfileFormValues } from "../types";
import { ItemCard } from "./ItemCard";
import { ProfileField } from "./ProfileField";

export const CertificationItem = ({ index, onRemove }: { index: number; onRemove: () => void }) => {
  const { values } = useFormikContext<ProfileFormValues>();
  const item = values.certifications[index];
  const name = `certifications.${index}`;
  if (!item) return null;

  return (
    <ItemCard
      title={item.name || "New certification"}
      subtitle={item.issuer}
      onRemove={onRemove}
      removeLabel={`Remove ${item.name || "certification"}`}
    >
      <ProfileField name={`${name}.name`} label="Name" placeholder="AWS Cloud Practitioner" />
      <ProfileField name={`${name}.issuer`} label="Issuer" placeholder="Amazon Web Services" optional />
      <ProfileField name={`${name}.link`} label="Credential link" type="url" optional className="sm:col-span-2" />
    </ItemCard>
  );
};
