import { AlertTriangle, Bot, Sparkles } from "lucide-react";
import { Button } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { GetAiAnalyzedData } from "../../../redux/action";

const AIAnalyzer = () => {
  const dispatch = useAppDispatch()

  const { getAnalyzedData, isAnalyzingLoading, isAnalyzingError } = useAppSelector(state => state.aiAnalyzer)

  const handleAnalyze = () => {
    dispatch(GetAiAnalyzedData()).catch(() => {});
  };

  const hasResult = Boolean(getAnalyzedData?.analysis);
  const isFallback = getAnalyzedData?.source === "fallback";
  const analysisPayload = getAnalyzedData?.analysis;
  const analysisObject =
    analysisPayload && typeof analysisPayload === "object" && !Array.isArray(analysisPayload)
      ? (analysisPayload as Record<string, unknown>)
      : null;
  const analysisText =
    typeof analysisPayload === "string" ? analysisPayload : JSON.stringify(analysisPayload ?? {}, null, 2);

  const briefSummary =
    analysisObject && typeof analysisObject.brief_summary === "string" ? analysisObject.brief_summary : null;
  const averageSkillScore =
    analysisObject && typeof analysisObject.average_skill_score === "number"
      ? analysisObject.average_skill_score
      : null;
  const focusAreas =
    analysisObject && Array.isArray(analysisObject.focus_areas)
      ? (analysisObject.focus_areas as string[]).filter((item) => typeof item === "string")
      : [];
  const actionItems =
    analysisObject && Array.isArray(analysisObject.action_items)
      ? (analysisObject.action_items as string[]).filter((item) => typeof item === "string")
      : [];
  const strengths =
    analysisObject && Array.isArray(analysisObject.strengths)
      ? (analysisObject.strengths as string[]).filter((item) => typeof item === "string")
      : [];

  return (
    <div className="py-20 px-4 min-h-screen sm:px-6 lg:px-20 bg-gradient-to-br from-slate-50 via-primary-50 to-slate-100">
      <div className="w-full mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary-600">
                <Sparkles className="w-6 h-6" />
                <h1 className="text-2xl font-bold text-gray-900">
                  AI Analyzer
                </h1>
              </div>
              <p className="text-gray-600 mt-2">
                Generate a personalized analysis of your profile, highlight
                strengths, and find gaps to improve.
              </p>
            </div>
            <div className="w-full md:w-64">
              <Button onClick={handleAnalyze} isLoading={isAnalyzingLoading}>
                Generate Analysis
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
              <Bot className="h-4 w-4 text-primary-600" />
              Uses your profile data
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
              Requires an active login
            </span>
          </div>

          {isAnalyzingError && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              <AlertTriangle className="h-5 w-5 mt-0.5" />
              <span>
                {typeof isAnalyzingError === "string"
                  ? isAnalyzingError
                  : "An error occurred during analysis"}
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {!hasResult ? (
            <div className="text-gray-500">
              Click{" "}
              <span className="font-semibold text-gray-700">
                Generate Analysis
              </span>{" "}
              to get insights based on your current profile.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary-100 text-primary-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  Source: {getAnalyzedData?.source}
                </span>
                {getAnalyzedData?.model && (
                  <span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    Model: {getAnalyzedData?.model}
                  </span>
                )}
                {isFallback && (
                  <span className="rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    Fallback Summary
                  </span>
                )}
              </div>

              {getAnalyzedData?.warning && (
                <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <span>{getAnalyzedData.warning}</span>
                </div>
              )}

              {analysisObject ? (
                <div className="space-y-5">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {briefSummary || "No summary provided."}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Average Skill Score
                      </p>
                      <p className="mt-2 text-2xl font-bold text-primary-700">
                        {averageSkillScore !== null
                          ? `${averageSkillScore} / 5`
                          : "N/A"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Focus Areas
                      </p>
                      <ul className="mt-2 space-y-2 text-sm text-slate-700">
                        {focusAreas.length > 0 ? (
                          focusAreas.map((item, index) => (
                            <li key={`focus-${index}`}>• {item}</li>
                          ))
                        ) : (
                          <li>No focus areas provided.</li>
                        )}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Strengths
                      </p>
                      <ul className="mt-2 space-y-2 text-sm text-slate-700">
                        {strengths.length > 0 ? (
                          strengths.map((item, index) => (
                            <li key={`strength-${index}`}>• {item}</li>
                          ))
                        ) : (
                          <li>No strengths provided.</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action Items
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-slate-700">
                      {actionItems.length > 0 ? (
                        actionItems.map((item, index) => (
                          <li key={`action-${index}`}>• {item}</li>
                        ))
                      ) : (
                        <li>No action items provided.</li>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-sm leading-6 text-gray-700 bg-slate-50 border border-slate-200 rounded-xl p-4">
                  {analysisText}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalyzer;
