import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  {
    _id: false,
    id: false,
  }
)

const SkillSchema = new mongoose.Schema(
  {
    name: String,
    level: String,
    rating: String,
  },
  { _id: false, id: false },
);

const ExperienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    skillAchieved: [String],
    domainsWorked: [String],
    startDate: Date,
    endDate: Date,
  },
  { _id: false, id: false },
);

const EducationSchema = new mongoose.Schema(
  {
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
  },
  { _id: false, id: false },
);

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    link: String,
  },
  { _id: false, id: false },
);

const CertificationSchema = new mongoose.Schema(
  {
    name: String,
    link: String,
  },
  { _id: false, id: false },
);

const LanguageSchema = new mongoose.Schema(
  {
    name: String,
    proficiency: String,
  },
  { _id: false, id: false },
);

const InterestSchema = new mongoose.Schema(
  {
    name: String,
  },
  { _id: false, id: false },
);

const UserProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    phoneNumber:{ type: String },
    address: { type: AddressSchema, default:[]},
    skills: { type: [SkillSchema], default: [] },
    experience: { type: [ExperienceSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    projects: { type: [ProjectSchema], default: [] },
    certifications: { type: [CertificationSchema], default: [] },
    languages: { type: [LanguageSchema], default: [] },
    interests: { type: [InterestSchema], default: [] },
}, { timestamps: true, versionKey: false });

const UserProfileModel = mongoose.model('UserProfile', UserProfileSchema);

export default UserProfileModel;
