import request from "supertest";
import { describe, expect, it } from "vitest";
import { app, SaveProfile, SignUp } from "@/backend/tests/helpers";

describe("profile", () => {
  it("returns null before a profile exists, then saves and returns it", async () => {
    const { auth } = await SignUp();

    const empty = await request(app).get("/api/profile/me").set(auth).expect(200);
    expect(empty.body).toBeNull();

    const saved = await SaveProfile(auth);
    expect(saved.body.skills).toEqual([{ name: "React", level: "Advanced", rating: 4 }]);
    expect(saved.body.experience[0]).toMatchObject({ isCurrent: true, endDate: null });
  });

  it("keeps every user's profile separate", async () => {
    const alice = await SignUp();
    const bob = await SignUp();
    await SaveProfile(alice.auth);

    const bobsView = await request(app).get("/api/profile/me").set(bob.auth).expect(200);
    expect(bobsView.body).toBeNull();
  });

  it("ignores ownership fields smuggled into the body", async () => {
    const alice = await SignUp();
    const bob = await SignUp();
    await request(app)
      .put("/api/profile/me")
      .set(bob.auth)
      .send({ userId: alice.user.id, headline: "bob" })
      .expect(200);

    const alicesView = await request(app).get("/api/profile/me").set(alice.auth).expect(200);
    expect(alicesView.body).toBeNull();
  });

  it("rejects invalid ratings", async () => {
    const { auth } = await SignUp();
    const response = await request(app)
      .put("/api/profile/me")
      .set(auth)
      .send({ skills: [{ name: "React", rating: 9 }] });
    expect(response.status).toBe(400);
  });

  it("publishes a public profile without phone number or street address", async () => {
    const { auth } = await SignUp({ name: "Grace" });
    await SaveProfile(auth);
    await request(app).patch("/api/profile/me/public").set(auth).send({ isPublic: true, slug: "grace-h" }).expect(200);

    const page = await request(app).get("/api/public/profiles/grace-h").expect(200);
    expect(page.body).toMatchObject({ name: "Grace", location: "Pune, MH, India" });
    expect(page.body.phoneNumber).toBeUndefined();
    expect(page.body.address).toBeUndefined();
  });

  it("hides private profiles and enforces unique, unreserved links", async () => {
    const first = await SignUp();
    const second = await SignUp();
    await SaveProfile(first.auth);
    await SaveProfile(second.auth);

    await request(app).patch("/api/profile/me/public").set(first.auth).send({ isPublic: false, slug: "taken" });
    await request(app).get("/api/public/profiles/taken").expect(404);

    const clash = await request(app).patch("/api/profile/me/public").set(second.auth).send({ isPublic: true, slug: "taken" });
    expect(clash.status).toBe(409);

    const reserved = await request(app).patch("/api/profile/me/public").set(second.auth).send({ isPublic: true, slug: "admin" });
    expect(reserved.status).toBe(400);
  });
});
