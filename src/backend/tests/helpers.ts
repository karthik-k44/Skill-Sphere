import request from "supertest";
import { AttachErrorHandler, CreateApp } from "@/backend/app";
import type { SessionResponseType } from "@/backend/types/user";

export const CreateTestApp = () => {
  const app = CreateApp();
  AttachErrorHandler(app);
  return app;
};

export const app = CreateTestApp();

let counter = 0;

/** Signs up a fresh user and returns their access token plus the refresh cookie header. */
export const SignUp = async (overrides: Partial<{ name: string; email: string; password: string }> = {}) => {
  counter += 1;
  const body = {
    name: "Test User",
    email: `user${counter}-${Date.now()}@test.dev`,
    password: "password-123",
    ...overrides,
  };
  const response = await request(app).post("/api/auth/signup").send(body).expect(201);
  const session = response.body as SessionResponseType;
  return {
    ...session,
    credentials: body,
    cookie: response.headers["set-cookie"] as unknown as string[],
    auth: { Authorization: `Bearer ${session.accessToken}` },
  };
};

export const SampleProfile = {
  headline: "Frontend developer",
  targetRole: "Full Stack Developer",
  summary: "Builds React apps.",
  phoneNumber: "+1 555 0100",
  address: { street: "1 Main St", city: "Pune", state: "MH", country: "India", zipCode: "411001" },
  skills: [{ name: "React", level: "Advanced", rating: 4 }],
  experience: [
    {
      company: "Acme",
      role: "Developer",
      startDate: "2023-01-01",
      endDate: "",
      isCurrent: true,
      description: "Built dashboards",
      skillAchieved: ["React"],
      domainsWorked: ["SaaS"],
    },
  ],
  projects: [{ title: "Portfolio", description: "Personal site", link: "", techStack: ["React"] }],
};

export const SaveProfile = (auth: Record<string, string>, profile: object = SampleProfile) =>
  request(app).put("/api/profile/me").set(auth).send(profile).expect(200);
