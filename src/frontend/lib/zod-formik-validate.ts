import { setIn, type FormikErrors } from "formik";
import type { z } from "zod";

/** Adapts a zod schema to Formik's `validate` prop, mapping issue paths onto nested error objects. */
export const ZodFormikValidate =
  <T extends object>(schema: z.ZodType) =>
  (values: T): FormikErrors<T> => {
    const result = schema.safeParse(values);
    if (result.success) return {};

    let errors: FormikErrors<T> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (path) errors = setIn(errors, path, issue.message);
    }
    return errors;
  };
