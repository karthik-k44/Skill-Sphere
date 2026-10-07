import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { FormField } from "@/frontend/components/form/FormField";
import { PasswordInput } from "@/frontend/components/form/PasswordInput";
import { Alert, AlertDescription } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { ZodFormikValidate } from "@/frontend/lib/zod-formik-validate";
import { authService } from "../services";
import { LoginSchema, type LoginInput } from "../types";

export const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const login = authService.useLoginMutation();

  const formik = useFormik<LoginInput>({
    initialValues: { email: "", password: "" },
    validate: ZodFormikValidate<LoginInput>(LoginSchema),
    onSubmit: (values) => login.mutate(values, { onSuccess }),
  });

  const ErrorOf = (field: keyof LoginInput) => formik.touched[field] && formik.errors[field];

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-4" noValidate>
      {login.error && (
        <Alert variant="destructive">
          <AlertDescription>{login.error.message}</AlertDescription>
        </Alert>
      )}
      <FormField label="Email" htmlFor="email" error={ErrorOf("email")}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(ErrorOf("email"))}
          {...formik.getFieldProps("email")}
        />
      </FormField>
      <FormField label="Password" htmlFor="password" error={ErrorOf("password")}>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          aria-invalid={Boolean(ErrorOf("password"))}
          {...formik.getFieldProps("password")}
        />
      </FormField>
      <Button type="submit" className="w-full" disabled={login.isPending}>
        {login.isPending && <Loader2 className="animate-spin" />}
        Log in
      </Button>
    </form>
  );
};
