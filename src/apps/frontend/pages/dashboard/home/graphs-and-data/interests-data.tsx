import React from 'react'
import { EmptyState, PanelBox } from '../../../../components'
import { Heart } from 'lucide-react'
import type { UserInterests } from '../../../../types';

interface InterestsDataProps {
  interests: UserInterests[];
}
const InterestsData: React.FC<InterestsDataProps>= ({ interests }) => {
  return (
    <PanelBox
      eyebrow="Interests"
      title="Personal signals"
      icon={<Heart className="h-5 w-5" />}
    >
      <div className="flex flex-wrap gap-3">
        {interests.length > 0 ? (
          interests.map((interest, index) => (
            <span
              key={`${interest?.name}-${index}`}
              className="rounded-full border border-slate-200 bg-gradient-to-r from-white to-primary-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
            >
              {interest?.name}
            </span>
          ))
        ) : (
          <div className="w-full">
            <EmptyState message="Add interests to make the profile more human and complete." />
          </div>
        )}
      </div>
    </PanelBox>
  )
}

export default InterestsData
