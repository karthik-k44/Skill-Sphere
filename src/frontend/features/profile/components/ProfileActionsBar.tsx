import { ArrowLeft, ArrowRight, Check, Loader2, Save } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";

type ProfileActionsBarProps = {
  isDirty: boolean;
  isSaving: boolean;
  canGoBack: boolean;
  canGoNext: boolean;
  onBack: () => void;
  onNext: () => void;
};

/** Sticky footer: step navigation plus a Save button that is always reachable. */
export const ProfileActionsBar = ({ isDirty, isSaving, canGoBack, canGoNext, onBack, onNext }: ProfileActionsBarProps) => (
  <div className="sticky bottom-0 z-10 -mx-4 flex items-center gap-2 border-t bg-background/90 px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
    <p className="hidden text-sm text-muted-foreground sm:block" aria-live="polite">
      {isDirty ? "Unsaved changes · a draft is kept on this device" : (
        <span className="flex items-center gap-1"><Check className="size-4 text-success" /> All changes saved</span>
      )}
    </p>
    <div className="ml-auto flex gap-2">
      <Button type="button" variant="ghost" onClick={onBack} disabled={!canGoBack}>
        <ArrowLeft /> Back
      </Button>
      {canGoNext && (
        <Button type="button" variant="outline" onClick={onNext}>
          Next <ArrowRight />
        </Button>
      )}
      <Button type="submit" disabled={isSaving || !isDirty}>
        {isSaving ? <Loader2 className="animate-spin" /> : <Save />} Save profile
      </Button>
    </div>
  </div>
);
