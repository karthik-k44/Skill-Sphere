import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Cn } from "@/frontend/lib/utils";

type ProfileActionsBarProps = {
  isDirty: boolean;
  isSaving: boolean;
  canGoBack: boolean;
  canGoNext: boolean;
  onBack: () => void;
  onNext: () => void;
};

/**
 * Floating dock pinned to the bottom of the profile workspace: save status, step navigation and the
 * Save pill. A centred glass capsule with a hairline ring (no shadow), so it never covers a card edge.
 */
export const ProfileActionsBar = ({ isDirty, isSaving, canGoBack, canGoNext, onBack, onNext }: ProfileActionsBarProps) => (
  <div className="pointer-events-none sticky bottom-4 z-20 flex justify-center">
    <div className="pointer-events-auto flex max-w-full items-center gap-1.5 rounded-full bg-background/85 p-1.5 shadow-outline backdrop-blur-xl sm:gap-2 sm:pl-5">
      <p className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex" aria-live="polite">
        <span
          aria-hidden
          className={Cn("size-2 rounded-full transition-colors", isDirty ? "bg-warning" : "bg-success")}
        />
        {isDirty ? "Unsaved changes" : "All changes saved"}
      </p>
      <span className="sr-only sm:hidden" aria-live="polite">
        {isDirty ? "Unsaved changes" : "All changes saved"}
      </span>
      <Button type="button" variant="ghost" size="sm" onClick={onBack} disabled={!canGoBack} aria-label="Previous step">
        <ArrowLeft /> <span className="hidden sm:inline">Back</span>
      </Button>
      {canGoNext && (
        <Button type="button" variant="outline" size="sm" onClick={onNext} aria-label="Next step">
          <span className="hidden sm:inline">Next</span> <ArrowRight />
        </Button>
      )}
      <Button type="submit" size="sm" disabled={isSaving || !isDirty} className="min-w-28">
        {isSaving ? <Loader2 className="animate-spin" /> : !isDirty && <Check />}
        {isSaving ? "Saving…" : isDirty ? "Save profile" : "Saved"}
      </Button>
    </div>
  </div>
);
