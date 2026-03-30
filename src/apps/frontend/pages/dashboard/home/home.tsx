import type { UserProfileResponse } from "../../../types";
import CareerProfile from "./graphs-and-data/career-profile";
import SkillGraph from "./graphs-and-data/skill-graph";
import LanguageGraph from "./graphs-and-data/language-graph";
import ExperienceTimeline from "./graphs-and-data/experience-timeline";
import EducationData from "./graphs-and-data/education-data";
import ProjectsData from "./graphs-and-data/projects-data";
import CertificatesData from "./graphs-and-data/certificates-data";
import InterestsData from "./graphs-and-data/interests-data";

interface HomePageProps {
  userData: UserProfileResponse;
}

export default function HomePage({ userData }: HomePageProps) {
  const skills = userData?.skills || [];
  const experiences = userData?.experience || [];
  const education = userData?.education || [];
  const projects = userData?.projects || [];
  const certifications = userData?.certifications || [];
  const languages = userData?.languages || [];
  const interests = userData?.interests || [];

  return (
    <div className="space-y-8">
      <CareerProfile userData={userData} />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SkillGraph skills={skills} />
        <LanguageGraph languages={languages} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <ExperienceTimeline experiences={experiences} />
          <EducationData education={education} />
        </div>

        <div className="space-y-6">
          <ProjectsData projects={projects} />
          <CertificatesData certifications={certifications} />
          <InterestsData interests={interests} />
        </div>
      </div>
    </div>
  );
}
