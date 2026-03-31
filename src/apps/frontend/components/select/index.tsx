import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

import type { DropDownOption } from '../../types';
import { ChevronDown } from 'lucide-react';
import styles from '../../../../clsx.styles';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  backgroundColor?: string;
  desktopWidth?: string;
  error?: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isLoading: boolean;
  isSearchable?: boolean;
  label?: string;
  multiple?: boolean;
  name?: string;
  options: DropDownOption[];
  tableWidth?: string;
  value?: string | number;
  verticalDesktopPadding?: keyof typeof styles.verticalPaddingDesktop;
  verticalMobilePadding?: keyof typeof styles.verticalPadding;
  verticalTabletPadding?: keyof typeof styles.verticalPaddingTablet;
  width?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLSelectElement>) => void;
  isOpenOptionsOnFocus?: boolean;
  textSize?: string;
  hoverEnable?: boolean;
}

const Select: React.FC<SelectProps> = ({
  backgroundColor = 'transparent',
  desktopWidth = 'auto',
  error,
  handleChange,
  isLoading,
  label,
  multiple,
  name,
  options,
  tableWidth = 'auto',
  value,
  verticalDesktopPadding = 2,
  verticalTabletPadding = 2,
  width = 'auto',
  isOpenOptionsOnFocus,
  onKeyDown,
  textSize,
  hoverEnable = false,
}) => {
  const ref = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (options.length === 1) {
      if (ref.current) {
        ref.current.value = options[0]?.value as string;
        ref.current.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }, [options]);

  useEffect(() => {
    if (isOpenOptionsOnFocus) {
      const checkFocus = () => {
        (ref.current as unknown as { showPicker: () => void }).showPicker?.();
      };

      ref?.current?.addEventListener('focus', checkFocus);

      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref?.current?.removeEventListener('focus', checkFocus);
      };
    }
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex w-full">
      <select
        ref={ref}
        className={clsx([
          'flex-1',
          styles.alignItems.center,
          styles.justifyContent.center,
          'h-10',
          'leading-tight',
          'truncate',
          styles.verticalPaddingTablet[verticalTabletPadding as keyof typeof styles.verticalPaddingTablet],
          styles.verticalPaddingDesktop[verticalDesktopPadding as keyof typeof styles.verticalPaddingDesktop],
          styles.width[width as keyof typeof styles.width],
          styles.tabletWidth[tableWidth as keyof typeof styles.tabletWidth],
          styles.desktopWidth[desktopWidth as keyof typeof styles.desktopWidth],
          styles.background[backgroundColor as keyof typeof styles.background],
          'rounded-lg',
          'border',
          'px-3',
          'pr-10',
          'outline-none hover:cursor-pointer',
          'appearance-none',
          `${error ? 'border-red-500' : 'border-stroke'}`,
          'focus:border-primary',
          'focus-visible:shadow-none',
          `${!value ? 'text-base text-blue-gray-200' : 'text-grey250'}`,
          `${textSize}`,
          hoverEnable && 'transition-all duration-200 ease-in-out hover:cursor-pointer hover:border-primary',
        ])}
        disabled={isLoading}
        multiple={multiple}
        onChange={handleChange}
        value={value}
        name={name}
        onKeyDown={onKeyDown}
      >
        {label && (
          <option value="" hidden>
            {label}
          </option>
        )}
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className="text-wrap text-grey100"
          >
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex h-full w-8 items-center justify-center">
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </span>
    </div>
  );
};

export default Select;
