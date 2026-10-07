import { describe, expect, it } from "vitest";
import { AiAnalysisSchema } from "@/backend/modules/analyzer/analyzer.validators";
import { ResumeDraftSchema } from "@/backend/modules/resume-import/resume-import.validators";

describe("AI output schemas", () => {
  it("clamps and coerces sloppy analyzer output instead of failing", () => {
    const parsed = AiAnalysisSchema.parse({
      overallScore: "105",
      scores: { skills: -3, experience: "70.6", projects: null, education: 50, presentation: 40 },
      summary: "  ok ",
      strengths: ["React", "", 3],
      improvements: [{ title: "Tests", detail: "Write some", priority: "urgent" }],
      resources: "not a list",
    });

    expect(parsed.overallScore).toBe(100);
    expect(parsed.scores).toMatchObject({ skills: 0, experience: 71, projects: 0 });
    expect(parsed.summary).toBe("ok");
    expect(parsed.strengths).toEqual(["React", "3"]);
    expect(parsed.improvements[0]?.priority).toBe("medium");
    expect(parsed.resources).toEqual([]);
  });

  it("repairs resume drafts before strict validation", () => {
    const draft = ResumeDraftSchema.parse({
      headline: "Engineer",
      skills: [{ name: "Go", rating: 4.6 }, { name: "" }],
      experience: [{ company: "Acme", role: "Dev", startDate: "2022-3", endDate: "Present" }],
    });

    expect(draft.skills).toEqual([{ name: "Go", level: "", rating: 5 }]);
    expect(draft.experience[0]?.startDate?.toISOString().slice(0, 7)).toBe("2022-03");
    expect(draft.experience[0]?.endDate).toBeNull();
  });
});
