import mongoose from "mongoose";

const JobMatchSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true, index: true },
    jobTitle: { type: String, required: true },
    company: { type: String, default: "" },
    jobDescription: { type: String, required: true },
    matchScore: { type: Number, required: true },
    verdict: String,
    matchedSkills: [String],
    missingSkills: [String],
    tailoredBullets: [String],
    recommendations: [String],
    model: String,
  },
  { timestamps: true, versionKey: false },
);

export const JobMatchModel = mongoose.model("JobMatch", JobMatchSchema);
