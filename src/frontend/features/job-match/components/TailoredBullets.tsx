import { Copy } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { ToastManager } from "@/frontend/lib/toast-manager";

const CopyText = (text: string, label: string) =>
  navigator.clipboard.writeText(text).then(
    () => ToastManager.Success(label),
    () => ToastManager.Info("Couldn't access the clipboard", "Select the text and copy it manually."),
  );

export const TailoredBullets = ({ bullets }: { bullets: string[] }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between gap-2">
      <h3 className="text-sm font-medium">Resume bullets tailored to this job</h3>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => CopyText(bullets.map((bullet) => `• ${bullet}`).join("\n"), "All bullets copied")}
      >
        <Copy /> Copy all
      </Button>
    </div>
    <ul className="space-y-2">
      {bullets.map((bullet) => (
        <li key={bullet} className="group flex items-start gap-2 rounded-lg border bg-muted/30 p-3 text-sm leading-6">
          <span className="flex-1">{bullet}</span>
          <Button
            size="icon"
            variant="ghost"
            className="size-7 shrink-0 opacity-60 group-hover:opacity-100"
            aria-label="Copy bullet"
            onClick={() => CopyText(bullet, "Bullet copied")}
          >
            <Copy className="size-3.5" />
          </Button>
        </li>
      ))}
    </ul>
  </div>
);
