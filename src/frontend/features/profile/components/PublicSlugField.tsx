import { useState } from "react";
import { useFormikContext } from "formik";
import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { Label } from "@/frontend/components/ui/label";
import { ToastManager } from "@/frontend/lib/toast-manager";
import type { ProfileFormValues } from "../types";

export const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$/;

/** "Karthik K" → "karthik-k": lowercase, anything else becomes a single dash. */
const ToSlug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/-{2,}/g, "-").slice(0, 40);

const LooksLikeUrl = (value: string) => /^(https?:\/\/|www\.)|\.[a-z]{2,}(\/|$)/i.test(value.trim());

type PublicSlugFieldProps = { slug: string; onChange: (slug: string) => void; disabled: boolean; error?: string };

/**
 * The short name for the SkillSphere-hosted page (/u/<slug>). People often paste their portfolio URL
 * here instead; we catch that and offer to put it in Links → Website, where it belongs.
 */
export const PublicSlugField = ({ slug, onChange, disabled, error }: PublicSlugFieldProps) => {
  const { setFieldValue } = useFormikContext<ProfileFormValues>();
  const [pastedUrl, setPastedUrl] = useState<string | null>(null);
  const isInvalid = slug.length > 0 && !SLUG_PATTERN.test(slug);

  const OnChange = (raw: string) => {
    if (LooksLikeUrl(raw)) return setPastedUrl(raw.trim());
    setPastedUrl(null);
    onChange(ToSlug(raw));
  };

  const UseAsWebsite = () => {
    if (!pastedUrl) return;
    setFieldValue("links.website", /^https?:\/\//i.test(pastedUrl) ? pastedUrl : `https://${pastedUrl}`);
    ToastManager.Success("Added as your Website link", "Press Save profile to keep it.");
    setPastedUrl(null);
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="public-slug">Your page name</Label>
      <div className="flex h-10 items-center rounded-full border border-input bg-background pl-4 focus-within:ring-[3px] focus-within:ring-ring/40">
        <span className="text-sm whitespace-nowrap text-muted-foreground">/u/</span>
        <Input
          id="public-slug"
          value={slug}
          disabled={disabled}
          placeholder="karthik-k"
          aria-invalid={isInvalid || Boolean(error)}
          aria-describedby="public-slug-hint"
          onChange={(event) => OnChange(event.target.value)}
          className="h-9 border-0 bg-transparent pl-0.5 focus-visible:ring-0"
        />
      </div>
      {pastedUrl ? (
        <div className="space-y-1 rounded-[20px] bg-muted p-3 text-xs">
          <p>
            That looks like a website. This box is the short name for your SkillSphere page, not your portfolio
            link.
          </p>
          <Button type="button" variant="link" size="xs" onClick={UseAsWebsite}>
            Use it as my Website link instead
          </Button>
        </div>
      ) : (
        <p id="public-slug-hint" className={isInvalid || error ? "text-xs text-destructive" : "truncate text-xs text-muted-foreground"}>
          {error ?? (isInvalid ? "3–40 letters, numbers or dashes; can't start or end with a dash." : `${window.location.host}/u/${slug || "your-name"}`)}
        </p>
      )}
    </div>
  );
};
