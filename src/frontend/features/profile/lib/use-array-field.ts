import { useFormikContext } from "formik";
import type { ProfileFormValues } from "../types";

type ArrayKey = {
  [K in keyof ProfileFormValues]: ProfileFormValues[K] extends unknown[] ? K : never;
}[keyof ProfileFormValues];

/** Add/remove helpers for one of the profile form's list fields. */
export const useArrayField = <K extends ArrayKey>(name: K) => {
  const { values, setFieldValue } = useFormikContext<ProfileFormValues>();
  const items = values[name] as ProfileFormValues[K];

  return {
    items,
    add: (item: ProfileFormValues[K][number]) => setFieldValue(name, [...items, item]),
    remove: (index: number) =>
      setFieldValue(
        name,
        items.filter((_, itemIndex) => itemIndex !== index),
      ),
  };
};
