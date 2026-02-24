import React, { type PropsWithChildren } from 'react';
import Text from '../typography/text';

interface FormControlProps {
  error: string,
  label?: string,
  gap?: number,
}

const FormControl: React.FC<PropsWithChildren<FormControlProps>> = ({
  children,
  error,
  label,
  gap = 3,
}) => (
  <div className={`flex flex-col w-full gap-${gap}`}>
    { label && <label className="block min-h-6 font-medium text-black">
      <Text font='ParagraphSmall' tabletFont='ParagraphMedium'>
        {label}
      </Text>
    </label>}
    <div className="relative">{children}</div>
    {error && (
      <div className="flex items-center text-xs font-medium tracking-wide text-red-500">
        {error}
      </div>
    )}
  </div>
);

export default FormControl;
