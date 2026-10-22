import { useEffect, useRef, useState } from "react";

/** True once the element has scrolled into view (and stays true). Used for scroll-reveal animations. */
export const useInView = <T extends Element>(rootMargin = "0px 0px -10% 0px") => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
};
