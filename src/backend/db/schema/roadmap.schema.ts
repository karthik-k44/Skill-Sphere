import mongoose from "mongoose";

const RoadmapItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  skill: String,
  durationWeeks: Number,
  resources: [new mongoose.Schema({ title: String, url: String }, { _id: false, id: false })],
  done: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
});

const RoadmapSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true, unique: true },
    targetRole: { type: String, default: "" },
    items: { type: [RoadmapItemSchema], default: [] },
  },
  { timestamps: true, versionKey: false },
);

export const RoadmapModel = mongoose.model("Roadmap", RoadmapSchema);
