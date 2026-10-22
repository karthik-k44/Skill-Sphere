import { useEffect, useState } from "react";

/** True once the page has scrolled past `offset` pixels (e.g. to give a sticky header its hairline). */
export const useScrolled = (offset = 8) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return isScrolled;
};
