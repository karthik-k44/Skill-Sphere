import { type ReactNode } from 'react'
import Text from '../typography/text';

interface ProfileCreatorCardsProps {
  badge: ReactNode;
  title: string;
  description?: string;
  stat?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
}
const ProfileCreatorCards = ({ badge, title, description, stat, action, children }: ProfileCreatorCardsProps) => {
  return (
    <div className="w-full rounded-[2rem] flex flex-col gap-5 border border-primary-100 bg-white p-4 md:p-6 shadow-[0_20px_60px_-28px_rgba(37,99,235,0.32)]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 md:flex-row md:w-full md:items-center md:justify-between">
          <div className="flex justify-between items-center md:gap-3">
            <div className="inline-flex items-center gap-2 h-fit w-fit rounded-full bg-primary-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary-700">
              {badge}
            </div>
          </div>
          <div className="md:hidden">
            <Text font="LabelLarge">{title}</Text>
            {description ? (
              <Text font="ParagraphSmall" color="text-primary-600">
                {description}
              </Text>
            ) : null}
          </div>
          <div className="flex justify-between items-center md:gap-3">
            {stat ? (
              <div className="inline-flex items-center gap-2 h-fit w-fit rounded-xl font-medium border border-primary-100 bg-primary-100 px-3 py-2 text-primary-700">
                {stat}
              </div>
            ) : null}
            {action ? <div className="w-fit">{action}</div> : null}
          </div>
        </div>
        <div className="hidden md:block">
          <Text font="LabelLarge">{title}</Text>
          {description ? (
            <Text font="ParagraphSmall" color="text-primary-600">
              {description}
            </Text>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
}

export default ProfileCreatorCards
