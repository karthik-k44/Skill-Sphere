import { CheckCircle2, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { StatCard } from "../../../../components";
import type { UserProfileResponse } from "../../../../types/user-profile";
import { FormatDuration, GetDurationInMonths, GetRating } from "../../../../utils";

interface CareerProfileProps {
  userData: UserProfileResponse;
}
const CareerProfile:React.FC<CareerProfileProps> = ({
  userData,
}) => {

  const skills = userData?.skills || [];
  const experiences = userData?.experience || [];
  const education = userData?.education || [];
  const projects = userData?.projects || [];
  const certifications = userData?.certifications || [];
  const languages = userData?.languages || [];
  const interests = userData?.interests || [];

  const totalExperienceMonths = experiences?.reduce(
    (total, item) =>
      total + GetDurationInMonths(item?.startDate, item?.endDate),
    0,
  );

  const averageSkillRating = userData?.skills?.length
    ? (
        userData?.skills?.reduce((total, skill) => total + GetRating(skill?.rating), 0) /
        userData?.skills?.length
      ).toFixed(1)
    : "0.0";
  
  const profileSections = [
    Boolean(userData?.phoneNumber),
    Boolean(
      userData?.address?.street ||
        userData?.address?.city ||
        userData?.address?.country,
    ),
    skills.length > 0,
    experiences.length > 0,
    education.length > 0,
    projects.length > 0,
    certifications.length > 0,
    languages.length > 0,
    interests.length > 0,
  ];

  const profileStrength = Math.round(
    (profileSections.filter(Boolean).length / profileSections.length) * 100,
  );

  const latestExperience = [...experiences].sort(
    (first, second) =>
      new Date(second?.endDate).getTime() - new Date(first?.endDate).getTime(),
  )[0];

  const topDomains = Object.entries(
    experiences.reduce<Record<string, number>>((domains, item) => {
      (item?.domainsWorked || []).forEach((domain) => {
        const trimmedDomain = domain?.trim();
        if (trimmedDomain)
          domains[trimmedDomain] = (domains[trimmedDomain] || 0) + 1;
      });
      return domains;
    }, {}),
  )
    .sort((first, second) => second[1] - first[1])
    .slice(0, 4);

  const location = [userData?.address?.city, userData?.address?.state, userData?.address?.country]
    .filter(Boolean)
    .join(", ");

  const completionData = [
    { label: "Contact", ok: Boolean(userData?.phoneNumber) },
    { label: "Experience", ok: experiences.length > 0 },
    { label: "Projects", ok: projects.length > 0 },
    { label: "Languages", ok: languages.length > 0 },
  ];

  const circleRadius = 56;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circumference - (profileStrength / 100) * circumference;

  return (
    <div>
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-gradient-to-r from-primary via-primary-900 to-primary-900 p-6 text-white shadow-xl shadow-slate-200/80 sm:p-8">
        <div className="relative grid gap-6 xl:grid-cols-[1.2fr_0.85fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100">
              <Sparkles className="h-4 w-4 text-amber-300" />
              Profile Analytics
            </div>
            <div className="space-y-3">
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
                Graph-driven view of your career profile.
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                This version highlights your skills, experience, projects, and
                languages with stronger hierarchy and lightweight visual
                analytics.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Skills" value={skills.length} />
              <StatCard
                label="Experience"
                value={FormatDuration(totalExperienceMonths)}
              />
              <StatCard label="Projects" value={projects.length} />
              <StatCard label="Avg Rating" value={`${averageSkillRating}/5`} />
            </div>

            <div className="flex flex-wrap gap-3">
              {location && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200">
                  <MapPin className="h-4 w-4 text-primary-200" />
                  {location}
                </span>
              )}
              {latestExperience?.role && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200">
                  <TrendingUp className="h-4 w-4 text-emerald-200" />
                  Latest role: {latestExperience.role}
                </span>
              )}
            </div>

            {topDomains.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Focus Domains
                </p>
                <div className="flex flex-wrap gap-2">
                  {topDomains.map(([domain, count]) => (
                    <span
                      key={domain}
                      className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100"
                    >
                      {domain} - {count}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Profile Strength</p>
                <h3 className="mt-1 text-xl font-semibold">Completion graph</h3>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                {profileStrength}% ready
              </span>
            </div>

            <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <div className="relative h-36 w-36">
                <svg className="h-36 w-36 -rotate-90" viewBox="0 0 140 140">
                  <circle
                    cx="70"
                    cy="70"
                    r={circleRadius}
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="12"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r={circleRadius}
                    fill="none"
                    stroke="url(#profile-ring)"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    strokeWidth="12"
                  />
                  <defs>
                    <linearGradient
                      id="profile-ring"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-semibold">
                    {profileStrength}%
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Score
                  </span>
                </div>
              </div>

              <div className="w-full space-y-3 sm:max-w-[210px]">
                {completionData.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/10 px-3 py-2"
                  >
                    <span className="text-sm text-slate-200">{item.label}</span>
                    {item.ok ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <span className="text-xs text-slate-400">Pending</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CareerProfile
