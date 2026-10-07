import mongoose from "mongoose";
import { env } from "@/backend/config/env";
import { logger } from "@/backend/config/logger";

export const ConnectDb = async (uri: string = env.DBURL) => {
  mongoose.set("strictQuery", true);
  // Wraps `$`-prefixed keys in query filters with $eq, so `{ "email": { "$ne": null } }` from a request can't become an operator.
  mongoose.set("sanitizeFilter", true);
  await mongoose.connect(uri);
  logger.info("Database connected");
};

export const DisconnectDb = () => mongoose.disconnect();
