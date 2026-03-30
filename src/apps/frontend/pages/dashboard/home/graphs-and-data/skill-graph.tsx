import { EmptyState, PanelBox } from '../../../../components';
import { Code, Star } from 'lucide-react';
import { GetRating } from '../../../../utils';
import type { Skills } from '../../../../types/user-profile';

interface SkillGraphProps {
  skills: Skills[]
}
const SkillGraph: React.FC<SkillGraphProps> = ({ skills }) => {
    const topSkills = [...skills]
    .sort((first, second) => GetRating(second?.rating) - GetRating(first?.rating))
    .slice(0, 5);
  return (
    <PanelBox
      eyebrow="Skill Graph"
      title="Strongest capabilities"
      icon={<Code className="h-5 w-5" />}
    >
      <div className="space-y-4">
        {topSkills.length > 0 ? (
          topSkills.map((skill) => {
            const rating = GetRating(skill?.rating);
            return (
              <div
                key={`${skill?.name}-${skill?.level}`}
                className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {skill?.name}
                    </p>
                    <p className="text-sm text-slate-500">{skill?.level}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {rating}/5
                  </span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 via-sky-500 to-emerald-500"
                    style={{ width: `${(rating / 5) * 100}%` }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <EmptyState message="Add skills to see your top strengths here." />
        )}
      </div>
    </PanelBox>
  );
}

export default SkillGraph
