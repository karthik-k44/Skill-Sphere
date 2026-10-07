import request from "supertest";
import { describe, expect, it } from "vitest";
import { app, SignUp } from "@/backend/tests/helpers";

describe("auth", () => {
  it("signs up, returns an access token and sets an httpOnly refresh cookie", async () => {
    const session = await SignUp({ name: "Ada" });

    expect(session.accessToken).toEqual(expect.any(String));
    expect(session.user).toMatchObject({ name: "Ada", role: "user", isDemo: false });
    expect(session.cookie.join(";")).toMatch(/ss_refresh=.*HttpOnly/i);
  });

  it("rejects a duplicate email with 409", async () => {
    const { credentials } = await SignUp();
    const response = await request(app).post("/api/auth/signup").send(credentials);
    expect(response.status).toBe(409);
  });

  it("validates signup input", async () => {
    const response = await request(app).post("/api/auth/signup").send({ name: "A", email: "nope", password: "1" });
    expect(response.status).toBe(400);
    expect(response.body.details.fields.length).toBeGreaterThan(0);
  });

  it("logs in with the right password and rejects the wrong one", async () => {
    const { credentials } = await SignUp();
    await request(app).post("/api/auth/login").send(credentials).expect(200);

    const wrong = await request(app).post("/api/auth/login").send({ ...credentials, password: "wrong-password" });
    expect(wrong.status).toBe(401);
    expect(wrong.body.message).toBe("Invalid email or password");
  });

  it("rejects operator injection in the login body", async () => {
    await SignUp();
    const response = await request(app).post("/api/auth/login").send({ email: { $ne: null }, password: "x" });
    expect(response.status).toBe(400);
  });

  it("refreshes a session from the cookie and revokes it on logout", async () => {
    const { cookie } = await SignUp();

    const refreshed = await request(app).post("/api/auth/refresh").set("Cookie", cookie).expect(200);
    expect(refreshed.body.accessToken).toEqual(expect.any(String));

    await request(app).post("/api/auth/logout").set("Cookie", cookie).expect(204);
    await request(app).post("/api/auth/refresh").set("Cookie", cookie).expect(401);
  });

  it("answers a refresh without a cookie with 204 (no session) rather than an error", async () => {
    await request(app).post("/api/auth/refresh").expect(204);
  });

  it("protects /me", async () => {
    await request(app).get("/api/auth/me").expect(401);
    const { auth, user } = await SignUp();
    const me = await request(app).get("/api/auth/me").set(auth).expect(200);
    expect(me.body.id).toBe(user.id);
  });

  it("signs into the demo account with a ready-made public profile", async () => {
    const demo = await request(app).post("/api/auth/demo").expect(200);
    expect(demo.body.user.isDemo).toBe(true);

    const profile = await request(app)
      .get("/api/profile/me")
      .set({ Authorization: `Bearer ${demo.body.accessToken}` })
      .expect(200);
    expect(profile.body.skills.length).toBeGreaterThan(0);
    expect(profile.body.slug).toBe("demo");
  });
});
