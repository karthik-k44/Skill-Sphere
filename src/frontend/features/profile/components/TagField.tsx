import { useFormikContext, getIn } from "formik";
import { TagInput } from "@/frontend/components/form/TagInput";
import { Label } from "@/frontend/components/ui/label";
import { Cn } from "@/frontend/lib/utils";
import type { ProfileFormValues } from "../types";

type TagFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  suggestions?: string[];
  className?: string;
};

/** A string[] form field edited as chips. */
export const TagField = ({ name, label, placeholder, suggestions, className }: TagFieldProps) => {
  const { values, setFieldValue } = useFormikContext<ProfileFormValues>();
  const id = `field-${name.replace(/\./g, "-")}`;

  return (
    <div className={Cn("grid gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <TagInput
        id={id}
        value={(getIn(values, name) as string[] | undefined) ?? []}
        onChange={(tags) => setFieldValue(name, tags)}
        placeholder={placeholder}
        suggestions={suggestions}
      />
    </div>
  );
};
