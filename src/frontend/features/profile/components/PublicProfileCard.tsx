import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, ExternalLink, Globe, Loader2 } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Label } from "@/frontend/components/ui/label";
import { Switch } from "@/frontend/components/ui/switch";
import { paths } from "@/frontend/config/paths";
import { ToastManager } from "@/frontend/lib/toast-manager";
import { profileService } from "../services";
import type { ProfileResponseType } from "../types";
import { PublicSlugField, SLUG_PATTERN } from "./PublicSlugField";

const SuggestSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 32) || "my-profile";

type PublicProfileCardProps = { profile: ProfileResponseType | null; userName: string };

/** Publishes a read-only portfolio page hosted by SkillSphere at /u/:slug. */
export const PublicProfileCard = ({ profile, userName }: PublicProfileCardProps) => {
  const [slug, setSlug] = useState(profile?.slug ?? SuggestSlug(userName));
  const update = profileService.usePublicSettingsMutation();
  const isLive = Boolean(profile?.isPublic && profile.slug);
  const liveUrl = `${window.location.origin}${paths.publicProfile(profile?.slug ?? slug)}`;
  const canSave = Boolean(profile) && SLUG_PATTERN.test(slug) && slug !== profile?.slug;

  const Save = (isPublic: boolean) => update.mutate({ isPublic, slug });
  const CopyLink = () =>
    navigator.clipboard.writeText(liveUrl).then(
      () => ToastManager.Success("Link copied"),
      () => ToastManager.Info("Copy this link", liveUrl),
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="size-4" /> Public profile
        </CardTitle>
        <CardDescription>
          {profile
            ? "A read-only page about you, hosted by SkillSphere, that you can send to recruiters. Phone and street address stay private."
            : "Save your profile first, then you can publish it."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="public-toggle" className="flex flex-col items-start gap-0.5">
            {isLive ? "Live" : "Private"}
            <span className="text-xs font-normal text-muted-foreground">
              {isLive ? "Anyone with the link can view it" : "Only you can see your profile"}
            </span>
          </Label>
          <Switch
            id="public-toggle"
            checked={isLive}
            disabled={!profile || update.isPending || !SLUG_PATTERN.test(slug)}
            onCheckedChange={(checked) => Save(checked)}
          />
        </div>
        <PublicSlugField slug={slug} onChange={setSlug} disabled={!profile} error={update.error?.message} />
        <div className="flex flex-wrap gap-2">
          {canSave && (
            <Button type="button" size="sm" onClick={() => Save(profile?.isPublic ?? false)} disabled={update.isPending}>
              {update.isPending && <Loader2 className="animate-spin" />} Save name
            </Button>
          )}
          {isLive && (
            <>
              <Button type="button" size="sm" variant="outline" onClick={CopyLink}>
                <Copy /> Copy link
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
