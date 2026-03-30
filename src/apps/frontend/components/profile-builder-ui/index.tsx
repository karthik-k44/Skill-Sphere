import clsx from "clsx";
import type {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";

interface BaseComponentProps {
  className?: string;
}

interface ProfileSectionHeaderProps extends BaseComponentProps {
  badge: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  stat?: ReactNode;
  action?: ReactNode;
}

interface ProfileItemHeaderProps extends BaseComponentProps {
  title: ReactNode;
  actions?: ReactNode;
}

interface ProfileIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    BaseComponentProps {}

export const ProfileStepLayout = ({
  children,
  className,
}: PropsWithChildren<BaseComponentProps>) => (
  <div className={clsx("space-y-8", className)}>{children}</div>
);

export const ProfileSection = ({
  children,
  className,
}: PropsWithChildren<BaseComponentProps>) => (
  <section
    className={clsx(
      "space-y-6 rounded-[1.75rem] border border-primary-100 bg-white p-6 shadow-[0_20px_60px_-28px_rgba(37,99,235,0.32)]",
      className,
    )}
  >
    {children}
  </section>
);

export const ProfileSectionHeader = ({
  badge,
  title,
  description,
  stat,
  action,
  className,
}: ProfileSectionHeaderProps) => (
  <div
    className={clsx(
      "flex flex-wrap items-start justify-between gap-4 border-b border-primary-100 pb-5",
      className,
    )}
  >
    <div className="space-y-3">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary-700">
        {badge}
      </div>
      <div>
        {title}
        {description ? (
          <div className="max-w-2xl text-sm leading-6 text-primary-700">
            {description}
          </div>
        ) : null}
      </div>
    </div>

    {stat ? (
      <div className="w-fit">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-2 text-sm font-medium text-primary-700">
          {stat}
        </div>
      </div>
    ) : null}

    {action ? <div className="w-fit">{action}</div> : null}
  </div>
);

export const ProfileSectionHint = ({
  children,
  className,
}: PropsWithChildren<BaseComponentProps>) => (
  <div
    className={clsx(
      "rounded-2xl border border-primary-100 bg-gradient-to-r from-primary-50 to-white px-4 py-3 text-sm leading-6 text-primary-700",
      className,
    )}
  >
    {children}
  </div>
);

export const ProfileItemCard = ({
  children,
  className,
}: PropsWithChildren<BaseComponentProps>) => (
  <div
    className={clsx(
      "space-y-5 rounded-[1.5rem] border border-primary-100 bg-gradient-to-br from-white via-primary-50/30 to-white p-5 shadow-sm shadow-primary-100/30",
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
      "flex items-center justify-between gap-3 border-b border-primary-100 pb-4",
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
      "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary-100 bg-white text-primary-600 shadow-sm shadow-primary-100/30 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700",
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
      "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-white text-red-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-700",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
