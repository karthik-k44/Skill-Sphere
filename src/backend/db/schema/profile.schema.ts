import mongoose, { type InferSchemaType } from "mongoose";

const options = { _id: false, id: false } as const;

const AddressSchema = new mongoose.Schema(
  { street: String, city: String, state: String, country: String, zipCode: String },
  options,
);
const LinksSchema = new mongoose.Schema({ github: String, linkedin: String, website: String }, options);
const SkillSchema = new mongoose.Schema({ name: String, level: String, rating: Number }, options);
const ExperienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    startDate: Date,
    endDate: Date,
    isCurrent: { type: Boolean, default: false },
    description: String,
    skillAchieved: [String],
    domainsWorked: [String],
  },
  options,
);
const EducationSchema = new mongoose.Schema(
  { institution: String, degree: String, fieldOfStudy: String, startDate: Date, endDate: Date, grade: String },
  options,
);
const ProjectSchema = new mongoose.Schema(
  { title: String, description: String, link: String, techStack: [String] },
  options,
);
const CertificationSchema = new mongoose.Schema({ name: String, issuer: String, link: String }, options);
const LanguageSchema = new mongoose.Schema({ name: String, proficiency: String }, options);
const InterestSchema = new mongoose.Schema({ name: String }, options);

const ProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true, unique: true },
    headline: String,
    targetRole: String,
    summary: String,
    phoneNumber: String,
    address: { type: AddressSchema, default: {} },
    links: { type: LinksSchema, default: {} },
    skills: { type: [SkillSchema], default: [] },
    experience: { type: [ExperienceSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    projects: { type: [ProjectSchema], default: [] },
    certifications: { type: [CertificationSchema], default: [] },
    languages: { type: [LanguageSchema], default: [] },
    interests: { type: [InterestSchema], default: [] },
    slug: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export type ProfileDocType = InferSchemaType<typeof ProfileSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

// Model name kept as "UserProfile" so profiles created before the restructure still load.
export const ProfileModel = mongoose.model("UserProfile", ProfileSchema);
