import clsx from "clsx";

interface ExpandableCardProps {
  isExpanded: boolean;
  maxHeight?: string;
  className?: string;
  children: React.ReactNode;
}

export const ExpandableCard = ({
  children,
  isExpanded,
  maxHeight = "max-h-[900px]",
  className,
}: ExpandableCardProps) => (
  <div
    className={clsx(
      "overflow-hidden transition-all duration-300 ease-in-out",
      isExpanded ? maxHeight : "max-h-0",
      className,
    )}
  >
    {children}
  </div>
);
