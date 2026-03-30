import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileText,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import { ButtonKind } from "../../../types/button";
import { ROUTES } from "../../../routes/types";
import { FeaturePreviews, LaunchPhases, ResumeIngredients } from "../../../constants/resume-builder";

const ResumeBuilder = () => {
  const navigate = useNavigate();

  return (
    <div className="py-20 px-4 min-h-screen sm:px-6 lg:px-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-24 h-48 w-48 rounded-full bg-primary-200/60 blur-3xl motion-safe:animate-pulse" />
        <div
          className="absolute right-10 top-20 h-64 w-64 rounded-full bg-primary-300/35 blur-3xl motion-safe:animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-primary-100 blur-3xl motion-safe:animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative mx-auto flex w-full flex-col gap-8">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-primary-100 bg-white/90 p-8 shadow-[0_28px_90px_-45px_rgba(107,33,168,0.5)] backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-600" />
              </span>
              Upcoming Launch
            </div>

            <div className="mt-6 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-600">
                Resume Builder
              </p>
              <h1 className="mt-3 text-4xl font-black leading-tight text-slate-900 md:text-5xl">
                A polished resume experience is on the way.
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                We are building a resume workspace that turns your Skill Sphere
                profile into a clean, export-ready document with better layout,
                better structure, and smarter content guidance.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-primary-100 bg-primary-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
                  Data Ready
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  Profile-Powered
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Pull details from your skills, education, projects, and work
                  history.
                </p>
              </div>
              <div className="rounded-2xl border border-primary-100 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
                  Focus
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  ATS-Friendly
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Cleaner sections and stronger content blocks for real-world
                  resume use.
                </p>
              </div>
              <div className="rounded-2xl border border-primary-100 bg-primary-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
                  Output
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  Export Ready
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A guided flow for generating a final resume you can actually
                  share.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="w-full sm:w-56">
                <Button onClick={() => navigate(ROUTES.PORTAL)}>
                  <span className="flex items-center justify-center gap-2">
                    Back to Home
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </div>
              <div className="w-full sm:w-56">
                <Button
                  kind={ButtonKind.DISCARD}
                  onClick={() => navigate(ROUTES.AI_ANALYZER)}
                >
                  Explore AI Analyzer
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-primary-700 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-6 text-white shadow-[0_30px_90px_-40px_rgba(76,29,149,0.75)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-100">
                  Builder Status
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-snug">
                  We are designing the first launch experience right now.
                </h2>
              </div>
              <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm motion-safe:animate-pulse">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm text-primary-100">
                <span>Launch progress</span>
                <span className="font-semibold text-white">80%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-white via-primary-100 to-primary-200 motion-safe:animate-pulse" />
              </div>

              <div className="mt-5 space-y-4">
                {LaunchPhases.map((phase) => {
                  const isDone = phase.state === "done";
                  const isActive = phase.state === "active";

                  return (
                    <div
                      key={phase.title}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <div
                        className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-full ${
                          isDone
                            ? "bg-white text-primary-700"
                            : isActive
                            ? "bg-primary-100 text-primary-800 motion-safe:animate-pulse"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Clock3 className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {phase.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-primary-100">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-[28px] bg-white p-5 text-slate-900 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-primary-100 p-3 text-primary-700">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">
                      Preview Board
                    </p>
                    <h3 className="text-lg font-bold text-slate-900">
                      Resume draft mockup
                    </h3>
                  </div>
                </div>
                <BadgeCheck className="h-6 w-6 text-primary-600" />
              </div>

              <div className="mt-5 space-y-3">
                <div className="h-3 w-3/4 rounded-full bg-primary-100" />
                <div className="h-2.5 w-full rounded-full bg-slate-100" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-primary-100 bg-primary-50/70 p-4">
                    <div className="h-2.5 w-24 rounded-full bg-primary-200" />
                    <div className="mt-3 h-2.5 w-full rounded-full bg-white" />
                    <div className="mt-2 h-2.5 w-5/6 rounded-full bg-white" />
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="h-2.5 w-20 rounded-full bg-slate-200" />
                    <div className="mt-3 h-2.5 w-full rounded-full bg-white" />
                    <div className="mt-2 h-2.5 w-4/6 rounded-full bg-white" />
                  </div>
                </div>
                <div className="h-2.5 w-11/12 rounded-full bg-slate-100" />
                <div className="h-2.5 w-2/3 rounded-full bg-slate-100" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {FeaturePreviews.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-[28px] border border-primary-100 bg-white/85 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-35px_rgba(107,33,168,0.45)]"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.accentClassName}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary-700">
                  <span>Planned for launch</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[30px] border border-primary-100 bg-white/90 p-7 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary-100 p-3 text-primary-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">
                  What the builder will use
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  Your current profile already prepares the foundation
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {ResumeIngredients.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-slate-50/80 p-4 transition duration-300 hover:border-primary-200 hover:bg-primary-50/70"
                  >
                    <div className="rounded-2xl bg-white p-3 text-primary-700 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[30px] border border-primary-100 bg-gradient-to-br from-white to-primary-50 p-7 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">
              Early Release Snapshot
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              The first version will focus on clarity, speed, and export-ready
              results.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              We are keeping the first release practical so you can move from
              profile data to a presentable resume with less manual rewriting.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Auto-fill major sections from your saved profile",
                "Clean visual structure for work, skills, education, and certifications",
                "Simple export flow for sharing your resume outside the platform",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-primary-100 bg-white/90 px-4 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary-600" />
                  <span className="text-sm leading-6 text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-primary-200 bg-primary-600 px-5 py-4 text-white shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-100">
                    Stay Ready
                  </p>
                  <p className="mt-2 text-lg font-bold">
                    Keep your profile updated so the builder can generate better
                    drafts from day one.
                  </p>
                </div>
                <div className="hidden rounded-2xl bg-white/15 p-3 text-white motion-safe:animate-bounce sm:block">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeBuilder;
