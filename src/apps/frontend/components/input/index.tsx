import clsx from 'clsx';
import * as React from 'react';

import styles from '../../../../../clsx.styles';
import Text from '../typography/text';

import InputStyles from './input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  endEnhancer?: React.ReactElement | string;
  error?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  startEnhancer?: React.ReactElement | string;
  testId?: string;
  textAlign?: 'left' | 'center' | 'right';
  type?: string;
  verticalPadding?: number;
  textColor?: string;
  extraStyles?: string;
  extraContainerStyles?: string;
  isShowCharacterCount?: boolean;
  maxLength?: number;
  rounded?: keyof typeof styles.rounded;
  gapBetweenInputAndEnhancer?: keyof typeof styles.gap | number;
  textSize?: string;
}

const Input: React.FC<InputProps> = ({
  endEnhancer,
  error,
  inputRef,
  startEnhancer,
  testId,
  textAlign = 'left',
  type,
  verticalPadding = 2,
  textColor = 'text-grey250',
  extraStyles,
  extraContainerStyles,
  isShowCharacterCount,
  maxLength,
  rounded = 'lg',
  gapBetweenInputAndEnhancer = 2 as keyof typeof styles.gap,
  textSize,
  ...props
}) => {
  const inputTimeRef = React.useRef<HTMLInputElement>(null);

  const handleShowTimePicker = () => {
    if (type === 'time') {
      const inputCurrent = inputTimeRef.current as unknown as { showPicker: () => void };
      inputCurrent.showPicker();
    }
  };

  return (
  <div
    className={clsx([
      InputStyles.inputContainer,
      styles.rounded[rounded],
      styles.verticalPadding[verticalPadding as keyof typeof styles.verticalPadding],
      `${extraContainerStyles}`,
      error ? InputStyles.border.errorState : InputStyles.border.normalState,
    ])}
  >
    <div className={clsx(['flex flex-row', styles.gap[gapBetweenInputAndEnhancer as keyof typeof styles.gap]])}>
      {startEnhancer && <span className={`flex h-full min-w-6 items-center justify-center ${textSize} ${textColor}`}>
        {startEnhancer}
      </span>}
      <input
        {...props}
        autoComplete='off'
        className={clsx([
          InputStyles.input,
          textAlign ? InputStyles.textAlign[textAlign] : '',
          textSize,
          textColor,
          `${extraStyles}`,
        ])}
        data-testid={testId}
        type={type || 'text'}
        maxLength={maxLength !== undefined ? maxLength + 1 : undefined}
        ref={inputRef || inputTimeRef}
        { ...(type === 'time' && { onClick: handleShowTimePicker }) }
      />
      {endEnhancer && <span className={`flex h-full min-w-6 items-center justify-center ${textSize} ${textColor}`}>
        {endEnhancer}
      </span>}
    {isShowCharacterCount && maxLength && props.value !== undefined && (
        <Text font="LabelSmall">
          {props?.value.toString().length}/{maxLength}
        </Text>
    )}
    </div>
  </div>
  );
};

export default Input;
