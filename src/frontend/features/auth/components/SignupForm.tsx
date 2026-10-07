import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { FormField } from "@/frontend/components/form/FormField";
import { PasswordInput } from "@/frontend/components/form/PasswordInput";
import { Alert, AlertDescription } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { ZodFormikValidate } from "@/frontend/lib/zod-formik-validate";
import { authService } from "../services";
import { SignupSchema, type SignupFormValues } from "../types";

export const SignupForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const signup = authService.useSignupMutation();

  const formik = useFormik<SignupFormValues>({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validate: ZodFormikValidate<SignupFormValues>(SignupSchema),
    onSubmit: ({ confirmPassword: _confirm, ...input }) => signup.mutate(input, { onSuccess }),
  });

  const ErrorOf = (field: keyof SignupFormValues) => formik.touched[field] && formik.errors[field];
  const serverFieldErrors = signup.error?.fieldErrors ?? {};

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-4" noValidate>
      {signup.error && (
        <Alert variant="destructive">
          <AlertDescription>{signup.error.message}</AlertDescription>
        </Alert>
      )}
      <FormField label="Full name" htmlFor="name" error={ErrorOf("name") || serverFieldErrors.name}>
        <Input id="name" autoComplete="name" placeholder="Ada Lovelace" {...formik.getFieldProps("name")} />
      </FormField>
      <FormField label="Email" htmlFor="email" error={ErrorOf("email") || serverFieldErrors.email}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...formik.getFieldProps("email")}
        />
      </FormField>
      <FormField
        label="Password"
        htmlFor="password"
        error={ErrorOf("password")}
        hint="At least 8 characters."
      >
        <PasswordInput id="password" autoComplete="new-password" {...formik.getFieldProps("password")} />
      </FormField>
      <FormField label="Confirm password" htmlFor="confirmPassword" error={ErrorOf("confirmPassword")}>
        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          {...formik.getFieldProps("confirmPassword")}
        />
      </FormField>
      <Button type="submit" className="w-full" disabled={signup.isPending}>
        {signup.isPending && <Loader2 className="animate-spin" />}
        Create account
      </Button>
    </form>
  );
};
