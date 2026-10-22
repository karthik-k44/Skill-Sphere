import { Link } from "react-router-dom";
import { Orbit } from "lucide-react";
import { Cn } from "@/frontend/lib/utils";

/** Monochrome glyph + wordmark in Ink (docs/design-system.md: no coloured brand blocks). */
export const Logo = ({ to = "/", className }: { to?: string; className?: string }) => (
  <Link
    to={to}
    className={Cn("flex items-center gap-1.5 font-display text-title font-semibold text-foreground", className)}
  >
    <Orbit className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
    <span>SkillSphere</span>
  </Link>
);
