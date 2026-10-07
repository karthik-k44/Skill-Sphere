import { useState } from "react";
import { useFormikContext } from "formik";
import { FileText, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/frontend/components/ui/dialog";
import { ToastManager } from "@/frontend/lib/toast-manager";
import { MergeIntoForm, ToFormValues } from "../lib/profile-form";
import { resumeImportService } from "../services";
import type { ProfileFormValues } from "../types";
import { ResumeDropzone } from "./ResumeDropzone";

const Summary = ({ draft }: { draft: ProfileFormValues }) => {
  const counts = [
    ["skills", draft.skills.length],
    ["roles", draft.experience.length],
    ["education entries", draft.education.length],
    ["projects", draft.projects.length],
    ["certifications", draft.certifications.length],
  ] as const;
  return (
    <div className="rounded-lg border bg-muted/40 p-4 text-sm">
      <p className="font-medium">{draft.headline || "We read your resume"}</p>
      <p className="mt-1 text-muted-foreground">
        Found {counts.map(([label, count]) => `${count} ${label}`).join(", ")}.
      </p>
    </div>
  );
};

export const ImportResumeDialog = () => {
  const [open, setOpen] = useState(false);
  const formik = useFormikContext<ProfileFormValues>();
  const parse = resumeImportService.useParseResumeMutation();
  const draft = parse.data ? ToFormValues(parse.data) : null;

  const Apply = (mode: "merge" | "replace") => {
    if (!draft) return;
    formik.setValues(mode === "merge" ? MergeIntoForm(formik.values, draft) : draft);
    ToastManager.Success("Resume imported", "Review the details, then press Save.");
    setOpen(false);
    parse.reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) parse.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="w-full justify-start">
          <FileText /> Import from resume (PDF)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import from your resume</DialogTitle>
          <DialogDescription>
            AI reads your PDF and fills in the form. Nothing is saved until you review it and press Save.
          </DialogDescription>
        </DialogHeader>

        {parse.isPending ? (
          <div role="status" className="flex flex-col items-center gap-3 py-10 text-muted-foreground">
            <Loader2 className="size-6 animate-spin text-primary" />
            Reading your resume… this usually takes 10–30 seconds.
          </div>
        ) : draft ? (
          <Summary draft={draft} />
        ) : (
          <ResumeDropzone onFile={(file) => parse.mutate(file)} onReject={(reason) => ToastManager.Error(new Error(reason), "Can't use that file")} />
        )}

        {parse.error && (
          <Alert variant="destructive">
            <AlertDescription>{parse.error.message}</AlertDescription>
          </Alert>
        )}

        {draft && (
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => Apply("replace")}>Replace everything</Button>
            <Button onClick={() => Apply("merge")}>Merge into my profile</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
