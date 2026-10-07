import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { aiService } from "@/backend/common/services/ai.service";
import { app, SaveProfile, SignUp } from "@/backend/tests/helpers";

const MockAi = (data: unknown) =>
  vi.mocked(aiService.GenerateJson).mockResolvedValue({ data, model: "test-model", totalTokens: 10 } as never);

const Analysis = {
  overallScore: 72,
  scores: { skills: 80, experience: 60, projects: 70, education: 75, presentation: 65 },
  summary: "Solid frontend profile.",
  strengths: ["React"],
  improvements: [{ title: "Add tests", detail: "Show testing skills", priority: "high" }],
  resources: [{ title: "Testing Library", type: "docs", url: "https://testing-library.com", reason: "Core skill" }],
};

describe("analyzer", () => {
  it("asks for profile data before analysing", async () => {
    const { auth } = await SignUp();
    const response = await request(app).post("/api/analyses").set(auth).send({});
    expect(response.status).toBe(400);
    expect(aiService.GenerateJson).not.toHaveBeenCalled();
  });

  it("saves an analysis, enforces the cooldown and lists history", async () => {
    const { auth } = await SignUp();
    await SaveProfile(auth);
    MockAi(Analysis);

    const created = await request(app).post("/api/analyses").set(auth).send({}).expect(201);
    expect(created.body).toMatchObject({ overallScore: 72, targetRole: "Full Stack Developer" });

    const prompt = vi.mocked(aiService.GenerateJson).mock.calls[0]?.[0].prompt ?? "";
    expect(prompt).not.toContain("+1 555 0100");

    const again = await request(app).post("/api/analyses").set(auth).send({});
    expect(again.status).toBe(429);
    expect(again.body.details.nextAllowedAt).toEqual(expect.any(String));

    const list = await request(app).get("/api/analyses").set(auth).expect(200);
    expect(list.body.items).toHaveLength(1);
    expect(list.body.nextAllowedAt).toEqual(expect.any(String));
  });

  it("does not expose another user's analysis", async () => {
    const owner = await SignUp();
    const other = await SignUp();
    await SaveProfile(owner.auth);
    MockAi(Analysis);
    const created = await request(app).post("/api/analyses").set(owner.auth).send({}).expect(201);

    await request(app).get(`/api/analyses/${created.body.id}`).set(other.auth).expect(404);
  });
});

describe("job match", () => {
  it("scores a job description and keeps it in history", async () => {
    const { auth } = await SignUp();
    await SaveProfile(auth);
    MockAi({
      matchScore: 64,
      verdict: "Good frontend fit.",
      matchedSkills: ["React"],
      missingSkills: ["GraphQL"],
      tailoredBullets: ["Built dashboards"],
      recommendations: ["Learn GraphQL"],
    });

    const job = { jobTitle: "Frontend Engineer", jobDescription: "We need a React engineer. ".repeat(5) };
    const created = await request(app).post("/api/job-matches").set(auth).send(job).expect(201);
    expect(created.body).toMatchObject({ matchScore: 64, missingSkills: ["GraphQL"] });

    const list = await request(app).get("/api/job-matches").set(auth).expect(200);
    expect(list.body).toHaveLength(1);

    await request(app).delete(`/api/job-matches/${created.body.id}`).set(auth).expect(204);
  });

  it("requires a real job description", async () => {
    const { auth } = await SignUp();
    const response = await request(app).post("/api/job-matches").set(auth).send({ jobTitle: "Dev", jobDescription: "short" });
    expect(response.status).toBe(400);
  });
});

describe("roadmap", () => {
  it("generates a plan and tracks progress per step", async () => {
    const { auth } = await SignUp();
    await SaveProfile(auth);
    MockAi({
      items: [
        { title: "Learn testing", description: "", skill: "Vitest", durationWeeks: 2, resources: [] },
        { title: "Ship an API", description: "", skill: "Node.js", durationWeeks: 3, resources: [] },
      ],
    });

    const roadmap = await request(app).post("/api/roadmap/generate").set(auth).send({}).expect(201);
    expect(roadmap.body.progress).toBe(0);

    const itemId = roadmap.body.items[0].id;
    const updated = await request(app).patch(`/api/roadmap/items/${itemId}`).set(auth).send({ done: true }).expect(200);
    expect(updated.body.progress).toBe(50);
    expect(updated.body.items[0].completedAt).toEqual(expect.any(String));
  });
});
