import { Briefcase, FolderGit2, Gauge, Wrench } from "lucide-react";
import { StatCard } from "@/frontend/components/data-display/StatCard";
import type { ProfileResponseType } from "@/frontend/features/profile/types";
import { FormatDuration, GetDurationInMonths } from "@/frontend/utils/format";

type DashboardStatsProps = { profile: ProfileResponseType; latestScore: number | null };

export const DashboardStats = ({ profile, latestScore }: DashboardStatsProps) => {
  const months = profile.experience.reduce(
    (total, item) => total + GetDurationInMonths(item.startDate, item.endDate, item.isCurrent),
    0,
  );
  const averageRating = profile.skills.length
    ? (profile.skills.reduce((total, skill) => total + skill.rating, 0) / profile.skills.length).toFixed(1)
    : "0";

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Skills" value={profile.skills.length} icon={Wrench} hint={`Avg. self-rating ${averageRating}/5`} />
      <StatCard label="Experience" value={FormatDuration(months)} icon={Briefcase} hint={`${profile.experience.length} roles`} />
      <StatCard label="Projects" value={profile.projects.length} icon={FolderGit2} hint="Portfolio pieces" />
      <StatCard
        label="Readiness score"
        value={latestScore === null ? "—" : `${latestScore}/100`}
        icon={Gauge}
        hint={latestScore === null ? "Run the analyzer" : "From your latest analysis"}
      />
    </div>
  );
};
