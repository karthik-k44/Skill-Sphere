import path from "node:path";
import bcrypt from "bcrypt";
import { env } from "@/backend/config/env";
import { logger } from "@/backend/config/logger";
import { ConnectDb, DisconnectDb } from "@/backend/db/client";
import { ProfileModel } from "@/backend/db/schema/profile.schema";
import { UserModel } from "@/backend/db/schema/user.schema";
import { DemoProfile } from "@/backend/db/seed-data";

/** Creates the demo account if missing and resets its profile to the sample data. */
export const EnsureDemoAccount = async () => {
  let user = await UserModel.findOne({ email: env.DEMO_EMAIL });
  if (!user) {
    user = await UserModel.create({
      name: "Demo Candidate",
      email: env.DEMO_EMAIL,
      password: await bcrypt.hash(env.DEMO_PASSWORD, 10),
      isDemo: true,
    });
  }

  await ProfileModel.findOneAndUpdate(
    { userId: user._id },
    { $set: { ...DemoProfile, slug: "demo", isPublic: true } },
    { upsert: true, setDefaultsOnInsert: true },
  );

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
