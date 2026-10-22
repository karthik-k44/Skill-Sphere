import path from "node:path";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { env } from "@/backend/config/env";
import { logger } from "@/backend/config/logger";
import { ConnectDb, DisconnectDb } from "@/backend/db/client";
import { AnalysisModel } from "@/backend/db/schema/analysis.schema";
import { JobMatchModel } from "@/backend/db/schema/job-match.schema";
import { ProfileModel } from "@/backend/db/schema/profile.schema";
import { RoadmapModel } from "@/backend/db/schema/roadmap.schema";
import { UserModel } from "@/backend/db/schema/user.schema";
import { DemoProfile } from "@/backend/db/seed-data";
import { DemoAnalyses, DemoJobMatches, DemoRoadmap } from "@/backend/db/seed-demo-insights";

/** Replaces the demo's analyses, job matches and roadmap with the sample set (AI is off for the demo). */
const ResetDemoInsights = async (userId: mongoose.Types.ObjectId) => {
  await Promise.all([AnalysisModel.deleteMany({ userId }), JobMatchModel.deleteMany({ userId })]);
  // Raw driver inserts keep the back-dated createdAt values; Mongoose timestamps would overwrite them.
  await Promise.all([
    AnalysisModel.collection.insertMany(DemoAnalyses.map((analysis) => ({ ...analysis, userId }))),
    JobMatchModel.collection.insertMany(DemoJobMatches.map((match) => ({ ...match, userId }))),
    RoadmapModel.findOneAndUpdate({ userId }, { $set: DemoRoadmap }, { upsert: true, setDefaultsOnInsert: true }),
  ]);
};

/** Creates the demo account if missing and resets its profile and sample AI results. */
export const EnsureDemoAccount = async () => {
  let user = await UserModel.findOne({ email: env.DEMO_EMAIL });
  if (!user) {
    user = await UserModel.create({
      name: "Demo Candidate",
      email: env.DEMO_EMAIL,
      password: await bcrypt.hash(env.DEMO_PASSWORD, 10),
      isDemo: true,
    });
  } else if (!user.isDemo) {
    user.isDemo = true;
    await user.save();
  }

  await ProfileModel.findOneAndUpdate(
    { userId: user._id },
    { $set: { ...DemoProfile, slug: "demo", isPublic: true } },
    { upsert: true, setDefaultsOnInsert: true },
  );
  await ResetDemoInsights(user._id);

  return user;
};

const IsDirectRun = process.argv[1]?.split(path.sep).join("/").endsWith("db/seed.ts");

if (IsDirectRun) {
  ConnectDb()
    .then(EnsureDemoAccount)
    .then(() => logger.info(`Demo account ready: ${env.DEMO_EMAIL}`))
    .catch((error: unknown) => {
      logger.error("Seeding failed", error);
      process.exitCode = 1;
    })
    .finally(DisconnectDb);
}
