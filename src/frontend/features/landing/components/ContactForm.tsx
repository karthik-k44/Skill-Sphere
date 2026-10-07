import { useFormik } from "formik";
import { Loader2, Send } from "lucide-react";
import { FormField } from "@/frontend/components/form/FormField";
import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/frontend/components/ui/select";
import { Textarea } from "@/frontend/components/ui/textarea";
import { ZodFormikValidate } from "@/frontend/lib/zod-formik-validate";
import { contactService } from "../services";
import { ContactMessageSchema, ContactTopicTypeEnum, type ContactMessageInput } from "../types";

const INITIAL: ContactMessageInput = { name: "", email: "", currentRole: "", topic: ContactTopicTypeEnum.GENERAL, message: "" };

export const ContactForm = () => {
  const send = contactService.useSendContactMessageMutation();
  const formik = useFormik<ContactMessageInput>({
    initialValues: INITIAL,
    validate: ZodFormikValidate<ContactMessageInput>(ContactMessageSchema),
    onSubmit: (values, helpers) => send.mutate(values, { onSuccess: () => helpers.resetForm() }),
  });
  const ErrorOf = (field: keyof ContactMessageInput) => formik.touched[field] && formik.errors[field];

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Name" htmlFor="contact-name" error={ErrorOf("name")}>
          <Input id="contact-name" autoComplete="name" {...formik.getFieldProps("name")} />
        </FormField>
        <FormField label="Email" htmlFor="contact-email" error={ErrorOf("email")}>
          <Input id="contact-email" type="email" autoComplete="email" {...formik.getFieldProps("email")} />
        </FormField>
        <FormField label="Current role" htmlFor="contact-role" optional>
          <Input id="contact-role" placeholder="Frontend Developer" {...formik.getFieldProps("currentRole")} />
        </FormField>
        <FormField label="Topic" htmlFor="contact-topic">
          <Select value={formik.values.topic} onValueChange={(value) => formik.setFieldValue("topic", value)}>
            <SelectTrigger id="contact-topic" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ContactTopicTypeEnum).map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>
      <FormField label="Message" htmlFor="contact-message" error={ErrorOf("message")}>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="Tell us the role you're targeting or what you need help with."
          {...formik.getFieldProps("message")}
        />
      </FormField>
      <Button type="submit" className="justify-self-end" disabled={send.isPending}>
        {send.isPending ? <Loader2 className="animate-spin" /> : <Send />} Send message
      </Button>
    </form>
  );
};
