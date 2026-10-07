import { Github, Globe, Linkedin, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/frontend/components/ui/avatar";
import { Button } from "@/frontend/components/ui/button";
import { Initials } from "@/frontend/utils/format";
import type { PublicProfileResponseType } from "../types";

const SafeUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : "");

export const PublicProfileHero = ({ profile }: { profile: PublicProfileResponseType }) => {
  const links = [
    { href: SafeUrl(profile.links.github), label: "GitHub", icon: Github },
    { href: SafeUrl(profile.links.linkedin), label: "LinkedIn", icon: Linkedin },
    { href: SafeUrl(profile.links.website), label: "Website", icon: Globe },
  ].filter((link) => link.href);

  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/15 via-card to-card p-6 sm:p-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Avatar className="size-20 text-2xl">
          <AvatarFallback className="bg-primary text-primary-foreground">{Initials(profile.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
          {(profile.headline || profile.targetRole) && (
            <p className="text-lg text-muted-foreground">{profile.headline || profile.targetRole}</p>
          )}
          {profile.location && (
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-4" /> {profile.location}
            </p>
          )}
        </div>
        {links.length > 0 && (
          <div className="flex gap-2">
            {links.map(({ href, label, icon: Icon }) => (
              <Button key={label} variant="outline" size="icon" asChild>
                <a href={href} target="_blank" rel="noreferrer noopener" aria-label={label}>
                  <Icon />
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
      {profile.summary && <p className="mt-6 max-w-3xl leading-7">{profile.summary}</p>}
    </section>
  );
};
