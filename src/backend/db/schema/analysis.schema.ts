import mongoose from "mongoose";

const options = { _id: false, id: false } as const;

const AnalysisSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true, index: true },
    targetRole: { type: String, default: "" },
    overallScore: { type: Number, required: true },
    scores: new mongoose.Schema(
      { skills: Number, experience: Number, projects: Number, education: Number, presentation: Number },
      options,
    ),
    summary: String,
    strengths: [String],
    improvements: [new mongoose.Schema({ title: String, detail: String, priority: String }, options)],
    resources: [new mongoose.Schema({ title: String, type: String, url: String, reason: String }, options)],
    model: String,
    totalTokens: Number,
  },
  { timestamps: true, versionKey: false },
);

export const AnalysisModel = mongoose.model("Analysis", AnalysisSchema);
