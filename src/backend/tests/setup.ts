import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { ConnectDb } from "@/backend/db/client";

// No test may reach a real AI provider; individual tests set the resolved value they need.
vi.mock("@/backend/common/services/ai.service", () => ({
  aiService: { GenerateJson: vi.fn(), ExtractJson: vi.fn() },
}));

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await ConnectDb(mongo.getUri());
  await Promise.all(Object.values(mongoose.models).map((model) => model.init()));
});

afterEach(async () => {
  vi.clearAllMocks();
  await Promise.all(Object.values(mongoose.connection.collections).map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo?.stop();
});
