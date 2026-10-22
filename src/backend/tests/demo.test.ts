import request from "supertest";
import { describe, expect, it } from "vitest";
import { aiService } from "@/backend/common/services/ai.service";
import { app } from "@/backend/tests/helpers";

const DemoLogin = async () => {
  const response = await request(app).post("/api/auth/demo").expect(200);
  return { Authorization: `Bearer ${response.body.accessToken}` };
};

describe("demo account", () => {
  it("comes with sample analyses, job matches and a roadmap", async () => {
    const auth = await DemoLogin();

    const analyses = await request(app).get("/api/analyses").set(auth).expect(200);
    expect(analyses.body.items).toHaveLength(2);
    expect(analyses.body.items[0].overallScore).toBe(74);

    const latest = await request(app).get(`/api/analyses/${analyses.body.items[0].id}`).set(auth).expect(200);
    expect(latest.body.improvements.length).toBeGreaterThan(0);

    const matches = await request(app).get("/api/job-matches").set(auth).expect(200);
    expect(matches.body.map((match: { matchScore: number }) => match.matchScore)).toEqual([82, 61]);

    const roadmap = await request(app).get("/api/roadmap").set(auth).expect(200);
    expect(roadmap.body.items).toHaveLength(6);
    expect(roadmap.body.progress).toBe(33);
  });

  it("blocks every AI route without calling the provider", async () => {
    const auth = await DemoLogin();
    const job = { jobTitle: "Engineer", jobDescription: "We need a React engineer who writes tests. ".repeat(4) };

    const responses = await Promise.all([
      request(app).post("/api/analyses").set(auth).send({}),
      request(app).post("/api/job-matches").set(auth).send(job),
      request(app).post("/api/roadmap/generate").set(auth).send({}),
      request(app).post("/api/resume-import").set(auth),
    ]);

    for (const response of responses) {
      expect(response.status).toBe(403);
      expect(response.body.code).toBe("DEMO_LOCKED");
    }
    expect(aiService.GenerateJson).not.toHaveBeenCalled();
  });

  it("still lets visitors tick roadmap steps, and resets on the next demo login", async () => {
    const auth = await DemoLogin();
    const roadmap = await request(app).get("/api/roadmap").set(auth).expect(200);
    const openStep = roadmap.body.items.find((item: { done: boolean }) => !item.done);

    const updated = await request(app).patch(`/api/roadmap/items/${openStep.id}`).set(auth).send({ done: true }).expect(200);
    expect(updated.body.progress).toBe(50);

    const nextVisitor = await DemoLogin();
    const reset = await request(app).get("/api/roadmap").set(nextVisitor).expect(200);
    expect(reset.body.progress).toBe(33);
  });
});
