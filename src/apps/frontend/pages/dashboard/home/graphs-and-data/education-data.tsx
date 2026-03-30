import React from 'react'
import { EmptyState, PanelBox } from '../../../../components';
import { Calendar, GraduationCap } from 'lucide-react';
import { FormatDate } from '../../../../utils';
import type { UserEducation } from '../../../../types';

interface EducationDataProps {
  education : UserEducation[];
}
const EducationData: React.FC<EducationDataProps> = ({ education }) => {
  return (
    <PanelBox
      eyebrow="Education"
      title="Academic foundation"
      icon={<GraduationCap className="h-5 w-5" />}
    >
      <div className="space-y-4">
        {education.length > 0 ? (
          education.map((item, index) => (
            <div
              key={`${item?.institution}-${item?.degree}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
            >
              <h4 className="text-lg font-semibold text-slate-900">
                {item?.degree}
              </h4>
              <p className="mt-1 text-sm font-medium text-primary-600">
                {item?.institution}
              </p>
              <p className="mt-3 text-sm text-slate-600">
                {item?.fieldOfStudy}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-slate-500 shadow-sm">
                <Calendar className="h-4 w-4" />
                {FormatDate(item?.startDate)} - {FormatDate(item?.endDate)}
              </div>
            </div>
          ))
        ) : (
          <EmptyState message="Add education details to complete this section." />
        )}
      </div>
    </PanelBox>
  );
};

export default EducationData
