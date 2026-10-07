import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { app, SignUp } from "@/backend/tests/helpers";

describe("github import", () => {
  afterEach(() => vi.restoreAllMocks());

  it("returns non-fork repos ranked by stars with a language summary", async () => {
    const repo = (name: string, stars: number, language: string, fork = false) => ({
      name,
      description: null,
      html_url: `https://github.com/octo/${name}`,
      homepage: null,
      language,
      stargazers_count: stars,
      topics: [],
      fork,
      archived: false,
      pushed_at: "2026-01-01T00:00:00Z",
      owner: { avatar_url: "https://avatars.githubusercontent.com/u/1" },
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([repo("small", 1, "Go"), repo("big", 50, "TypeScript"), repo("copy", 99, "C", true)])),
    );

    const { auth } = await SignUp();
    const response = await request(app).get("/api/github/users/octo/repos").set(auth).expect(200);

    expect(response.body.repos.map((item: { name: string }) => item.name)).toEqual(["big", "small"]);
    expect(response.body.languages).toEqual([
      { name: "TypeScript", count: 1 },
      { name: "Go", count: 1 },
    ]);
  });

  it("maps a missing GitHub user to 404", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 404 }));
    const { auth } = await SignUp();
    await request(app).get("/api/github/users/nobody-here/repos").set(auth).expect(404);
  });
});

describe("contact", () => {
  it("stores a valid message and rejects an incomplete one", async () => {
    await request(app)
      .post("/api/contact")
      .send({ name: "Lin", email: "lin@test.dev", topic: "General question", message: "How do I export my resume?" })
      .expect(201);

    const invalid = await request(app).post("/api/contact").send({ name: "Lin", email: "lin@test.dev" });
    expect(invalid.status).toBe(400);
  });
});

describe("resume import", () => {
  it("rejects non-PDF uploads", async () => {
    const { auth } = await SignUp();
    const response = await request(app)
      .post("/api/resume-import")
      .set(auth)
      .attach("file", Buffer.from("plain text"), { filename: "resume.txt", contentType: "text/plain" });
    expect(response.status).toBe(400);
  });
});

describe("api", () => {
  it("reports health and the running commit (used by the deploy pipeline)", async () => {
    const response = await request(app).get("/api/health").expect(200);
    expect(response.body).toEqual({ status: "ok", commit: null });
  });

  it("returns JSON 404s for unknown routes", async () => {
    const response = await request(app).get("/api/does-not-exist").expect(404);
    expect(response.body.code).toBe("NOT_FOUND");
  });
});
