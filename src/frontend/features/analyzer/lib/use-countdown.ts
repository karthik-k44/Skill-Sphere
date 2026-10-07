import { useEffect, useState } from "react";

/** Milliseconds left until `target` (ISO string), ticking every second; 0 once passed or when null. */
export const useCountdown = (target: string | null | undefined) => {
  const [now, setNow] = useState(() => Date.now());
  const targetMs = target ? new Date(target).getTime() : 0;
  const remaining = Math.max(targetMs - now, 0);

  useEffect(() => {
    if (!targetMs || targetMs <= Date.now()) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [targetMs]);

  return remaining;
};
