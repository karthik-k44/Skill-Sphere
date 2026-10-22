import { useEffect, useState } from "react";
import { useInView } from "@/frontend/hooks/use-in-view";

type AnimatedNumberProps = { value: number; suffix?: string; duration?: number; className?: string };

/** Counts up from 0 to `value` once it scrolls into view. Screen readers get the final value only. */
export const AnimatedNumber = ({ value, suffix = "", duration = 1200, className }: AnimatedNumberProps) => {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 4))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      <span aria-hidden>
        {display}
        {suffix}
      </span>
    </span>
  );
};
