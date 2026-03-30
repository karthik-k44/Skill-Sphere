import { EmptyState, PanelBox } from '../../../../components';
import { BarChart3 } from 'lucide-react';
import type { UserLanguages } from '../../../../types';

interface LanguageGraphProps {
  languages: UserLanguages[]
}
const LanguageGraph:React.FC<LanguageGraphProps> = ({
  languages,
}) => {
  const proficiencyScoreMap: Record<string, number> = {
    Native: 100,
    Fluent: 88,
    Advanced: 72,
    Intermediate: 56,
    Conversational: 40,
    Basic: 24,
  };
  return (
    <PanelBox
      eyebrow="Language Graph"
      title="Communication range"
      icon={<BarChart3 className="h-5 w-5" />}
    >
      <div className="space-y-4">
        {languages.length > 0 ? (
          languages.map((language) => (
            <div
              key={`${language?.name}-${language?.proficiency}`}
              className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-semibold text-slate-900">
                  {language?.name}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                  {language?.proficiency}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 to-primary-600"
                  style={{
                    width: `${
                      proficiencyScoreMap[language?.proficiency] || 20
                    }%`,
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <EmptyState message="Add languages to visualize proficiency." />
        )}
      </div>
    </PanelBox>
  );
}

export default LanguageGraph
