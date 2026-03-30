import { ExternalLink, TrendingUp } from "lucide-react";
import type { UserProjects } from "../../../../types"
import { EmptyState, PanelBox } from "../../../../components";

interface ProjectsDataProps {
  projects: UserProjects[]
}
const ProjectsData:React.FC<ProjectsDataProps> = ({ projects }) => {
  return (
    <PanelBox
      eyebrow="Projects"
      title="Showcase work"
      icon={<TrendingUp className="h-5 w-5" />}
    >
      <div className="space-y-4">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={`${project?.title}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-primary-50 to-white p-5"
            >
              <h4 className="text-lg font-semibold text-slate-900">
                {project?.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {project?.description}
              </p>
              {project?.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
                >
                  Open project
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          ))
        ) : (
          <EmptyState message="Add projects to showcase your work." />
        )}
      </div>
    </PanelBox>
  );
}

export default ProjectsData
