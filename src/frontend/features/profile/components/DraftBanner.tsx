import { History } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { FormatRelative } from "@/frontend/utils/format";

type DraftBannerProps = { savedAt: string; onRestore: () => void; onDiscard: () => void };

export const DraftBanner = ({ savedAt, onRestore, onDiscard }: DraftBannerProps) => (
  <Alert>
    <History />
    <AlertTitle>You have unsaved changes from {FormatRelative(savedAt)}</AlertTitle>
    <AlertDescription className="flex flex-wrap items-center gap-2">
      <span>They were kept on this device. Restore them to keep editing.</span>
      <div className="flex gap-2">
        <Button size="sm" onClick={onRestore}>Restore</Button>
        <Button size="sm" variant="ghost" onClick={onDiscard}>Discard</Button>
      </div>
    </AlertDescription>
  </Alert>
);
