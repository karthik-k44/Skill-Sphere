import type { ReactNode } from 'react'
import Text from '../typography/text';

interface PanelBoxProps {
  title: string;
  eyebrow: string;
  icon: ReactNode;
  children: ReactNode;
}
const PanelBox = ({ title, eyebrow, icon, children }: PanelBoxProps) => {
  return (
    <section className="rounded-[1.75rem] border border-primary-100 bg-white p-6 shadow-lg shadow-primary-100/40">
      <div className="flex items-center justify-between gap-4">
        <div className='flex flex-col gap-2'>
          <Text font='LabelSmall' color='text-primary'>{eyebrow}</Text>
          <Text font='LabelLarge' >{title}</Text>
        </div>
        <div className="rounded-2xl bg-primary-100 p-3 text-primary-700">
          {icon}
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default PanelBox
