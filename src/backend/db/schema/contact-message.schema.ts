import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    currentRole: { type: String, default: "" },
    topic: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const ContactMessageModel = mongoose.model("ContactMessage", ContactMessageSchema);
