import { Link, useParams } from "react-router-dom";
import { Briefcase, FolderGit2, GraduationCap, SearchX } from "lucide-react";
import { EmptyState } from "@/frontend/components/feedback/EmptyState";
import { PageLoader } from "@/frontend/components/feedback/PageLoader";
import { PublicFooter } from "@/frontend/components/layout/PublicFooter";
import { PublicHeader } from "@/frontend/components/layout/PublicHeader";
import { Badge } from "@/frontend/components/ui/badge";
import { Button } from "@/frontend/components/ui/button";
import { paths } from "@/frontend/config/paths";
import { useDocumentTitle } from "@/frontend/hooks/use-document-title";
import { FormatDateRange } from "@/frontend/utils/format";
import { PublicProfileHero } from "./components/PublicProfileHero";
import { PublicSkills } from "./components/PublicSkills";
import { PublicTimeline } from "./components/PublicTimeline";
import { publicProfileService } from "./services";

const PublicProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: profile, isPending, error } = publicProfileService.usePublicProfile(slug);
  useDocumentTitle(profile?.name ?? "Profile");

  return (
    <div className="flex min-h-svh flex-col">
      <PublicHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-10 sm:px-6">
        {isPending ? (
          <PageLoader />
        ) : error || !profile ? (
          <EmptyState
            icon={SearchX}
            title="This profile isn't available"
            description="It may be private, or the link may be mistyped."
            action={<Button asChild><Link to={paths.home}>Go to SkillSphere</Link></Button>}
          />
        ) : (
          <>
            <PublicProfileHero profile={profile} />
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="min-w-0 space-y-6">
                <PublicTimeline
                  title="Experience"
                  icon={Briefcase}
                  entries={profile.experience.map((item, index) => ({
                    key: `exp-${index}`,
                    title: item.role,
                    subtitle: item.company,
                    period: FormatDateRange(item.startDate, item.endDate, item.isCurrent),
                    description: item.description,
                    tags: item.skillAchieved,
                  }))}
                />
                <PublicTimeline
                  title="Projects"
                  icon={FolderGit2}
                  entries={profile.projects.map((item, index) => ({
                    key: `project-${index}`,
                    title: item.title,
                    subtitle: "",
                    period: "",
                    description: item.description,
                    tags: item.techStack,
                    href: /^https?:\/\//i.test(item.link) ? item.link : undefined,
                  }))}
                />
                <PublicTimeline
                  title="Education"
                  icon={GraduationCap}
                  entries={profile.education.map((item, index) => ({
                    key: `edu-${index}`,
                    title: item.institution,
                    subtitle: [item.degree, item.fieldOfStudy].filter(Boolean).join(", "),
                    period: FormatDateRange(item.startDate, item.endDate),
                    description: item.grade,
                    tags: [],
                  }))}
                />
              </div>
              <aside className="space-y-6">
                <PublicSkills skills={profile.skills} />
                {profile.certifications.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-sm font-medium text-muted-foreground">Certifications</h2>
                    {profile.certifications.map((cert) => (
                      <p key={cert.name} className="text-sm">{cert.name}{cert.issuer && ` · ${cert.issuer}`}</p>
                    ))}
                  </div>
                )}
                {profile.languages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((language) => (
                      <Badge key={language.name} variant="outline">{language.name}</Badge>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </>
        )}
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicProfile;
