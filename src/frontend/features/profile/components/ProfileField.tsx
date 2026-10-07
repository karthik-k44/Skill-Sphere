import { getIn, useFormikContext } from "formik";
import { FormField } from "@/frontend/components/form/FormField";
import { Input } from "@/frontend/components/ui/input";
import { Textarea } from "@/frontend/components/ui/textarea";
import type { ProfileFormValues } from "../types";

type ProfileFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  hint?: string;
  optional?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: "text" | "url" | "tel" | "month";
  maxLength?: number;
  disabled?: boolean;
  className?: string;
};

/** A text/textarea field bound to the profile Formik form by dotted path, e.g. `experience.0.role`. */
export const ProfileField = ({
  name,
  label,
  placeholder,
  hint,
  optional,
  multiline,
  rows = 4,
  type = "text",
  maxLength,
  disabled,
  className,
}: ProfileFieldProps) => {
  const formik = useFormikContext<ProfileFormValues>();
  const id = `field-${name.replace(/\./g, "-")}`;
  const field = formik.getFieldProps<string>(name);
  const isTouched = Boolean(getIn(formik.touched, name)) || formik.submitCount > 0;
  const error = isTouched ? (getIn(formik.errors, name) as string | undefined) : undefined;
  const value = field.value ?? "";
  const counter = multiline && maxLength ? `${value.length}/${maxLength}` : undefined;

  const shared = {
    ...field,
    id,
    value,
    placeholder,
    maxLength,
    disabled,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
  };

  return (
    <FormField label={label} htmlFor={id} error={error} hint={hint ?? counter} optional={optional} className={className}>
      {multiline ? <Textarea rows={rows} {...shared} /> : <Input type={type} {...shared} />}
    </FormField>
  );
};
