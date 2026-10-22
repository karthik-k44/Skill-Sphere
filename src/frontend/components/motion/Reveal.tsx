import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/frontend/hooks/use-in-view";
import { Cn } from "@/frontend/lib/utils";

type RevealProps = {
  as?: "div" | "li" | "article" | "section";
  /** Stagger siblings by passing increasing delays (ms). */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Fades and lifts its children into place the first time they scroll into view. Children can react
 * to the same moment with `group-data-[visible=true]/reveal:*` classes (e.g. bars that grow).
 */
export const Reveal = ({ as = "div", delay = 0, className, style, children }: RevealProps) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  // One element type at runtime; typed as div so the ref and props line up.
  const Element = as as "div";

  return (
    <Element
      ref={ref}
      data-visible={inView}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      className={Cn(
        "group/reveal transition-[opacity,translate] duration-900 ease-out-expo",
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
    >
      {children}
    </Element>
  );
};
