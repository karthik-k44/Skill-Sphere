import { useFormik } from "formik";
import { AlertTriangle, Loader2, Target } from "lucide-react";
import { FormField } from "@/frontend/components/form/FormField";
import { Alert, AlertDescription, AlertTitle } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Input } from "@/frontend/components/ui/input";
import { Textarea } from "@/frontend/components/ui/textarea";
import { ZodFormikValidate } from "@/frontend/lib/zod-formik-validate";
import { jobMatchService } from "../services";
import { CreateJobMatchSchema, type CreateJobMatchInput } from "../types";

export const JobMatchForm = ({ onCreated }: { onCreated: (id: string) => void }) => {
  const create = jobMatchService.useCreateJobMatchMutation();
  const formik = useFormik<CreateJobMatchInput>({
    initialValues: { jobTitle: "", company: "", jobDescription: "" },
    validate: ZodFormikValidate<CreateJobMatchInput>(CreateJobMatchSchema),
    onSubmit: (values, helpers) =>
      create.mutate(values, {
        onSuccess: (match) => {
          helpers.resetForm();
          onCreated(match.id);
        },
      }),
  });
  const ErrorOf = (field: keyof CreateJobMatchInput) => formik.touched[field] && formik.errors[field];
  const length = formik.values.jobDescription.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compare with a job posting</CardTitle>
        <CardDescription>Paste the full description — requirements, responsibilities and nice-to-haves.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="grid gap-4" noValidate>
          {create.error && !create.isPending && (
            <Alert variant="destructive">
              <AlertTriangle />
              <AlertTitle>The comparison didn't finish</AlertTitle>
              <AlertDescription>{create.error.message}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Job title" htmlFor="jobTitle" error={ErrorOf("jobTitle")}>
              <Input id="jobTitle" placeholder="Frontend Engineer" {...formik.getFieldProps("jobTitle")} />
            </FormField>
            <FormField label="Company" htmlFor="company" optional>
              <Input id="company" placeholder="Acme Inc." {...formik.getFieldProps("company")} />
            </FormField>
          </div>
          <FormField
            label="Job description"
            htmlFor="jobDescription"
            error={ErrorOf("jobDescription")}
            hint={`${length.toLocaleString()} / 12,000 characters`}
          >
            <Textarea
              id="jobDescription"
              rows={10}
              placeholder="We're looking for an engineer who…"
              className="max-h-96"
              {...formik.getFieldProps("jobDescription")}
            />
          </FormField>
          <Button type="submit" disabled={create.isPending} className="justify-self-end">
            {create.isPending ? <Loader2 className="animate-spin" /> : <Target />}
            {create.isPending ? "Comparing…" : "Check my match"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
