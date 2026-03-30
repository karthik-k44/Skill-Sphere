import mongoose from "mongoose";

const AnalyzeMessageSchema = new mongoose.Schema(
  {
    explanation: String,
    improvements: String,
    sources: String,
  },
  { _id: false, id: false },
);

const UserAIAnalyzerSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
  },
  analyzeId: {
      type: String,
      required: true,
  },
  analyzeMessage :{
      type: AnalyzeMessageSchema,
      default: {
          explanation: "",
          improvements: "",
          sources: "",
      },
  },
  metadata: {
      type: Object,
      default:{}
  },
  meta:{
      type: Object,
      default:{}
  },
}, {
  timestamps: true,
  versionKey: false,
})


const AIAnalyzerModel = mongoose.model("AIAnalyzer", UserAIAnalyzerSchema);

export default AIAnalyzerModel;
