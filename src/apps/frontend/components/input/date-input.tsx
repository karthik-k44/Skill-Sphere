import clsx from 'clsx';
import { isValid, parse } from 'date-fns';
import moment from 'moment';
import React, {
  useEffect, useId, useRef, useState,
} from 'react';
import { DayPicker } from 'react-day-picker';

import styles from '../../clsx.styles';
import { formatToMMDDYYYY } from '../../utils/date-utils';
import HorizontalStackLayout from '../layouts/horizontal-stack-layout';

import InputStyles from './input.styles';

interface DateInputProps {
  startEnhancer?: React.ReactNode;
  endEnhancer?: React.ReactNode;
  textSize?: string;
  error?: string;
  maxDate?: Date;
  minDate?: Date;
  value: Date | string;
  onChange: (date: Date) => void;
  placeholder: string;
  handleOnBlurFn?: (val: boolean) => void;
  isManualInput?: boolean;
  isShowClearIcon?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  rounded?: string;
}
const DateInput: React.FC<DateInputProps> = ({
  error,
  maxDate,
  minDate,
  value,
  onChange,
  startEnhancer,
  endEnhancer,
  placeholder,
  handleOnBlurFn,
  isManualInput = false,
  isShowClearIcon = false,
  onKeyDown,
  onClick,
  textSize,
  rounded = 'lg',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();
  const headerId = useId();

  const [month, setMonth] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const [inputValue, setInputValue] = useState('');

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialogForManualInput = () => {
    if (isManualInput) {
      setIsDialogOpen(!isDialogOpen);
    }
  };

  const toggleDialog = (e: React.MouseEvent) => {
    if (
      dialogRef.current
      && !dialogRef.current.contains(e.target as Node)
      && !isShowClearIcon
    ) {
      setIsDialogOpen(!isDialogOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDialogOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [datePickerRef]);

  useEffect(() => {
    const handleBodyScroll = (isOpen: boolean) => {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (!dialogRef.current) return null;

    if (isDialogOpen) {
      handleBodyScroll(true);
      dialogRef.current.showModal();
    } else {
      handleBodyScroll(false);
      dialogRef.current.close();
    }

    return () => {
      handleBodyScroll(false);
    };
  }, [isDialogOpen]);

  const adjustDateToCurrentTime = (date: Date):Date => {
    const now = new Date();
    return moment(date).set({
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      milliseconds: now.getMilliseconds(),
    }).toDate();
  };

  const handleDayPickerSelect = (date: Date) => {
    if (!date) {
      setInputValue('');
      setSelectedDate(undefined);
    } else {
      setSelectedDate(adjustDateToCurrentTime(date));
      onChange(adjustDateToCurrentTime(date));
      setInputValue(moment(adjustDateToCurrentTime(date)).format('MM/DD/yyyy'));
      dialogRef.current?.close();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isManualInput) {
      setInputValue(formatToMMDDYYYY(e.target.value));
      const parsedDate = parse(e.target.value, 'MM/dd/yyyy', new Date());

      if (isValid(parsedDate)) {
        setSelectedDate(parsedDate);
        setMonth(parsedDate);
      } else {
        setSelectedDate(undefined);
      }
    }
  };

  const handleOnBlur = () => {
    if (isManualInput) {
      const parsedDate = parse(inputValue, 'MM/dd/yyyy', new Date());
      handleOnBlurFn(true);
      if (isValid(parsedDate) && inputValue.length === 10) {
        if (maxDate && parsedDate <= maxDate && !minDate) {
          setSelectedDate(moment(value).toDate());
          setMonth(moment(value).toDate());
          onChange(adjustDateToCurrentTime(parsedDate));
        } else if (minDate && parsedDate >= minDate && !maxDate) {
          setSelectedDate(moment(value).toDate());
          setMonth(moment(value).toDate());
          onChange(adjustDateToCurrentTime(parsedDate));
        } else if (minDate && maxDate && parsedDate >= minDate && parsedDate <= maxDate) {
          setSelectedDate(moment(value).toDate());
          setMonth(moment(value).toDate());
          onChange(adjustDateToCurrentTime(parsedDate));
        } else {
          setSelectedDate(moment(value).toDate());
          setMonth(moment(value).toDate());
          onChange(adjustDateToCurrentTime(parsedDate));
        }
      } else {
        onChange('' as unknown as Date);
        setInputValue('');
        setSelectedDate(undefined);
      }
    }
  };

  useEffect(() => {
    if (value) {
      setSelectedDate(moment(value).toDate());
      setMonth(moment(value).toDate());
      setInputValue(moment(value).format('MM/DD/yyyy'));
    } else {
      setInputValue('');
      setSelectedDate(undefined);
    }
  }, [value]);

  return (
    <div
      onClick={toggleDialog}
      className={clsx([
        InputStyles.inputContainer,
        'py-2',
        error ? InputStyles.border.errorState : InputStyles.border.normalState,
        styles.rounded[rounded],
      ])}
    >
      <HorizontalStackLayout gap={2}>
        {startEnhancer && (
          <span className="flex h-full min-w-6 cursor-pointer items-center justify-center">
            {startEnhancer}
          </span>
        )}
        <input
          id="date-input"
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={handleOnBlur}
          onClick={onClick}
          onKeyDown={onKeyDown}
          className={`w-full text-grey250 outline-none placeholder:text-sm placeholder:text-blue-gray-200 ${textSize}`}
        />
        <dialog
          role="dialog"
          ref={dialogRef}
          id={dialogId}
          aria-modal
          aria-labelledby={headerId}
          onClose={() => setIsDialogOpen(false)}
        >
          <div ref={datePickerRef}>
            <DayPicker
              className="h-75 border-0 p-1 xs:h-100 xs:p-4"
              classNames={{
                caption: 'flex justify-center py-2 mb-4 relative items-center',
                nav: 'flex items-center',
                nav_button:
                  'h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
                nav_button_previous: 'absolute left-1.5',
                nav_button_next: 'absolute right-1.5',
                table: 'w-full border-collapse h-full',
                head_row: 'flex font-medium text-gray-900',
                head_cell: 'm-0.5 w-5 xs:w-9 font-normal text-sm',
                row: 'flex w-full mt-2',
                cell: 'text-gray-600 rounded-md h-5 w-5 xs:w-9 xs:h-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day: 'h-5 w-5 xs:w-9 xs:h-9 p-0 font-normal',
                day_range_end: 'day-range-end',
                day_selected:
                  'rounded-md bg-primary text-white hover:text-white focus:bg-primary focus:text-white',
                day_today: 'rounded-md bg-gray-200',
                day_outside:
                  'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
                day_disabled: 'text-gray-500 opacity-50',
                day_hidden: 'invisible',
              }}
              month={month}
              onMonthChange={setMonth}
              initialFocus
              mode="single"
              selected={selectedDate}
              onSelect={handleDayPickerSelect}
              fromDate={minDate}
              toDate={maxDate}
            />
          </div>
        </dialog>
        {endEnhancer && (
          <>
          {
            isShowClearIcon ? (
              <span className="flex h-full min-w-6 cursor-pointer items-center justify-center">
                {endEnhancer}
              </span>
            ) : (
              <span onClick={toggleDialogForManualInput} className="flex h-full min-w-6 cursor-pointer items-center justify-center">
                {endEnhancer}
              </span>
            )
          }
          </>
        )}
      </HorizontalStackLayout>
    </div>
  );
};

export default DateInput;
