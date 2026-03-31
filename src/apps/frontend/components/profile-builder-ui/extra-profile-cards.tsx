import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";
interface BaseComponentProps {
  className?: string;
}

interface ProfileIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    BaseComponentProps {}

interface ProfileItemHeaderProps extends BaseComponentProps {
  title: ReactNode;
  actions?: ReactNode;
}

export const ProfileItemCard = ({
  children,
  className,
}: PropsWithChildren<BaseComponentProps>) => (
  <div
    className={clsx(
      "space-y-5 rounded-2xl p-4 md:p-6 shadow-sm shadow-primary-100/30 border border-primary-100",
      className,
    )}
  >
    {children}
  </div>
);

export const ProfileItemHeader = ({
  title,
  actions,
  className,
}: ProfileItemHeaderProps) => (
  <div
    className={clsx(
      "flex items-center justify-between gap-2",
      className,
    )}
  >
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 shadow-sm shadow-primary-100/40 ring-1 ring-primary-100">
      {title}
    </span>
    {actions}
  </div>
);

export const ProfileIconButton = ({
  children,
  className,
  type = "button",
  ...props
}: ProfileIconButtonProps) => (
  <button
    type={type}
    className={clsx(
      "inline-flex h-10 w-10 hover:cursor-pointer items-center justify-center rounded-xl border border-primary-100 bg-white text-primary-600 shadow-sm shadow-primary-100/30 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);


export const ProfileDeleteIconButton = ({
  children,
  className,
  type = "button",
  ...props
}: ProfileIconButtonProps) => (
  <button
    type={type}
    className={clsx(
      "inline-flex h-10 hover:cursor-pointer w-10 items-center justify-center rounded-xl border border-red-100 bg-white text-red-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-700",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

