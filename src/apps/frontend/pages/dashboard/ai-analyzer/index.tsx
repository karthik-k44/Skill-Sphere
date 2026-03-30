import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Bot,
  FileText,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { Button } from "../../../components";
import { Skeleton } from "../../../components/skeleton";
import {
  CreateAIGeneratedInsights,
  GetAiAnalyzedData,
} from "../../../redux/action";
import { resetAiAnalyzerState } from "../../../redux/reducer/ai-analyzer";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { FormatDateTime, FormatRemainingTime } from "../../../utils/ai-analyser.util";

const AIAnalyzer = () => {
  const dispatch = useAppDispatch();
  const [now, setNow] = useState(Date.now());

  const {
    getAnalyzedData,
    isAnalyzingLoading,
    isAnalyzingError,
    isCreatingAnalyzedDataLoading,
    isCreatingAnalyzedDataError,
  } = useAppSelector((state) => state.aiAnalyzer);

  useEffect(() => {
    dispatch(resetAiAnalyzerState());
    dispatch(GetAiAnalyzedData()).catch(() => {});
  }, [dispatch]);

  const nextAllowedAt = getAnalyzedData?.nextAllowedAt
    ? new Date(getAnalyzedData.nextAllowedAt)
    : null;
  const remainingCooldownMs =
    nextAllowedAt && !Number.isNaN(nextAllowedAt.getTime())
      ? Math.max(nextAllowedAt.getTime() - now, 0)
      : 0;
  const isCooldownActive = remainingCooldownMs > 0;

  useEffect(() => {
    if (!isCooldownActive) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [isCooldownActive]);

  const handleGenerateInsights = () => {
    if (isCooldownActive) {
      return;
    }

    dispatch(CreateAIGeneratedInsights()).catch(() => {});
  };

  const hasSavedAnalysis = Boolean(
    getAnalyzedData?.analyzeMessage?.explanation ||
      getAnalyzedData?.analyzeMessage?.improvements ||
      getAnalyzedData?.analyzeMessage?.sources,
  );

  const errorMessage =
    isCreatingAnalyzedDataError.message || isAnalyzingError.message;
  const isInitialLoading = isAnalyzingLoading && !getAnalyzedData;
  const isButtonDisabled = isCreatingAnalyzedDataLoading || isCooldownActive;

  const analysisSections = [
    {
      title: "Candidate Summary",
      description:
        "A recruiter-style overview of the candidate's current profile, strengths, and overall positioning.",
      content: getAnalyzedData?.analyzeMessage?.explanation || "",
      icon: FileText,
      accentClassName: "bg-primary-100 text-primary-700",
    },
    {
      title: "Improvement Areas",
      description:
        "The main areas where the candidate can improve depth, clarity, and professional readiness.",
      content: getAnalyzedData?.analyzeMessage?.improvements || "",
      icon: Lightbulb,
      accentClassName: "bg-amber-100 text-amber-700",
    },
    {
      title: "Learning Sources",
      description:
        "Practical places to learn, practice, and strengthen the next set of skills.",
      content: getAnalyzedData?.analyzeMessage?.sources || "",
      icon: BookOpen,
      accentClassName: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-slate-100 px-4 py-20 sm:px-6 lg:px-20">
      <div className="mx-auto flex w-full flex-col gap-6">
        <section className="overflow-hidden rounded-[2rem] border border-primary-100 bg-white shadow-[0_28px_80px_-45px_rgba(37,99,235,0.45)]">
          <div className="bg-gradient-to-r from-primary via-primary-900 to-primary-900 px-8 py-8 text-white">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary-50">
                  <Sparkles className="h-4 w-4" />
                  AI Career Analyzer
                </div>
                <h1 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
                  Personalized career feedback from the profile you already
                  built.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-primary-50/90 md:text-base">
                  Generate a focused career readout with a summary, improvement
                  areas, and learning directions based on your saved Skill
                  Sphere profile.
                </p>
              </div>

              <div className="w-full max-w-sm rounded-[1.75rem] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm text-primary-50/90">
                  <Bot className="h-4 w-4" />
                  Uses your saved profile data
                </div>

                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl bg-white/10 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-100">
                      Last Generated
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {hasSavedAnalysis
                        ? FormatDateTime(getAnalyzedData?.updatedAt)
                        : "No analysis saved yet"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-100">
                      Next Available
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {isCooldownActive
                        ? `Try again in ${FormatRemainingTime(
                            remainingCooldownMs,
                          )}`
                        : "Ready now"}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    onClick={handleGenerateInsights}
                    isLoading={isCreatingAnalyzedDataLoading}
                    disabled={isButtonDisabled}
                  >
                    {isCooldownActive
                      ? `Available In ${FormatRemainingTime(
                          remainingCooldownMs,
                        )}`
                      : hasSavedAnalysis
                      ? "Regenerate Analysis"
                      : "Generate Analysis"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="border-t border-red-100 bg-red-50 px-6 py-4 text-red-700">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5" />
                <span className="text-sm leading-6">{errorMessage}</span>
              </div>
            </div>
          )}
        </section>

        {isInitialLoading ? (
          <section className="rounded-[2rem] border border-primary-100 bg-white p-6 shadow-lg">
            <div className="space-y-6">
              <div className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="grid gap-5 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.75rem] border border-slate-100 bg-slate-50/70 p-5"
                  >
                    <Skeleton variant="circular" className="h-12 w-12" />
                    <Skeleton className="mt-5 h-5 w-40" />
                    <Skeleton className="mt-3 h-4 w-full" />
                    <Skeleton className="mt-2 h-4 w-4/5" />
                    <Skeleton className="mt-5 h-24 w-full rounded-[1rem]" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : !hasSavedAnalysis ? (
          <section className="rounded-[2rem] border border-dashed border-primary-200 bg-white/90 p-10 text-center shadow-lg">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                No analysis available yet
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                Generate your first AI analysis to see a candidate summary,
                improvement areas, and suggested learning sources based on your
                current profile.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
                <span className="rounded-full bg-slate-100 px-4 py-2">
                  Summary
                </span>
                <span className="rounded-full bg-slate-100 px-4 py-2">
                  Improvements
                </span>
                <span className="rounded-full bg-slate-100 px-4 py-2">
                  Learning Sources
                </span>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="grid gap-5 lg:grid-cols-3">
              {analysisSections.map((section) => {
                const Icon = section.icon;

                return (
                  <article
                    key={section.title}
                    className="rounded-[2rem] border border-primary-100 bg-white p-6 shadow-[0_20px_55px_-35px_rgba(37,99,235,0.35)]"
                  >
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${section.accentClassName}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-slate-900">
                      {section.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {section.description}
                    </p>
                    <div className="mt-5 rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                        {section.content ||
                          "No content available for this section yet."}
                      </p>
                    </div>
                  </article>
                );
              })}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAnalyzer;
