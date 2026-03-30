import { Briefcase, Calendar } from "lucide-react";
import { EmptyState, PanelBox } from "../../../../components";
import type { UserExperience } from "../../../../types";
import { FormatDate, FormatDuration, GetDurationInMonths } from "../../../../utils";

interface ExperienceTimelineProps {
  experiences: UserExperience[]
}
const ExperienceTimeline:React.FC<ExperienceTimelineProps> = ({ experiences }) => {
  return (
    <PanelBox
      eyebrow="Experience Timeline"
      title="Career journey"
      icon={<Briefcase className="h-5 w-5" />}
    >
      <div className="space-y-5">
        {experiences.length > 0 ? (
          experiences.map((item, index) => (
            <div
              key={`${item?.company}-${item?.role}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h4 className="text-xl font-semibold text-slate-900">
                    {item?.role}
                  </h4>
                  <p className="mt-1 text-sm font-medium text-primary-600">
                    {item?.company}
                  </p>
                </div>
                <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                  {FormatDuration(
                    GetDurationInMonths(item?.startDate, item?.endDate),
                  )}
                </span>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500">
                <Calendar className="h-4 w-4" />
                {FormatDate(item?.startDate)} - {FormatDate(item?.endDate)}
              </div>
            </div>
          ))
        ) : (
          <EmptyState message="Add work experience to build your timeline." />
        )}
      </div>
    </PanelBox>
  );
}

export default ExperienceTimeline
