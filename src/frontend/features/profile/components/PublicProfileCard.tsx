import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, ExternalLink, Globe, Loader2 } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Input } from "@/frontend/components/ui/input";
import { Label } from "@/frontend/components/ui/label";
import { Switch } from "@/frontend/components/ui/switch";
import { paths } from "@/frontend/config/paths";
import { ToastManager } from "@/frontend/lib/toast-manager";
import { profileService } from "../services";
import type { ProfileResponseType } from "../types";

const SuggestSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 32) || "my-profile";

type PublicProfileCardProps = { profile: ProfileResponseType | null; userName: string };

/** Lets the user publish a read-only portfolio page at /u/:slug. */
export const PublicProfileCard = ({ profile, userName }: PublicProfileCardProps) => {
  const [slug, setSlug] = useState(profile?.slug ?? SuggestSlug(userName));
  const update = profileService.usePublicSettingsMutation();
  const publicUrl = `${window.location.origin}${paths.publicProfile(profile?.slug ?? slug)}`;
  const isLive = Boolean(profile?.isPublic && profile.slug);

  const Save = (isPublic: boolean) => update.mutate({ isPublic, slug });
  const CopyLink = () =>
    navigator.clipboard.writeText(publicUrl).then(
      () => ToastManager.Success("Link copied"),
      () => ToastManager.Info("Copy this link", publicUrl),
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="size-4 text-primary" /> Public profile
        </CardTitle>
        <CardDescription>
          {profile ? "Share a read-only page with recruiters. Phone and street address stay private." : "Save your profile first."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="public-toggle">{isLive ? "Live" : "Private"}</Label>
          <Switch
            id="public-toggle"
            checked={isLive}
            disabled={!profile || update.isPending}
            onCheckedChange={(checked) => Save(checked)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="public-slug">Profile link</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">/u/</span>
            <Input
              id="public-slug"
              value={slug}
              disabled={!profile}
              onChange={(event) => setSlug(event.target.value.toLowerCase())}
            />
          </div>
          {update.error && <p className="text-xs text-destructive">{update.error.message}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          {profile && slug !== profile.slug && (
            <Button size="sm" onClick={() => Save(profile.isPublic)} disabled={update.isPending}>
              {update.isPending && <Loader2 className="animate-spin" />} Save link
            </Button>
          )}
          {isLive && (
            <>
              <Button size="sm" variant="outline" onClick={CopyLink}>
                <Copy /> Copy
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link to={paths.publicProfile(profile?.slug ?? slug)} target="_blank">
                  <ExternalLink /> View
                </Link>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
