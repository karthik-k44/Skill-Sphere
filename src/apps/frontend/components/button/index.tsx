import clsx from 'clsx';
import React, { type PropsWithChildren } from 'react';
import styles from './button.styles';
import { ButtonKind, ButtonType } from '../../types/button';
import Spinner from '../spinner';

interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonType;
  kind?: ButtonKind;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  isLoading,
  onClick,
  type = ButtonType.BUTTON,
  kind = ButtonKind.PRIMARY,
}) => {
  const content = isLoading && kind === ButtonKind.PRIMARY ? <Spinner /> : children;

  return (
    <button
      className={clsx([
        styles.kind[kind].base,
        (disabled || isLoading) ? styles.kind[kind].disableState : styles.kind[kind].enableState,
      ])}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
