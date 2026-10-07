import { Link } from "react-router-dom";
import { Orbit } from "lucide-react";
import { Cn } from "@/frontend/lib/utils";

export const Logo = ({ to = "/", className }: { to?: string; className?: string }) => (
  <Link to={to} className={Cn("flex items-center gap-2 font-semibold tracking-tight", className)}>
    <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
      <Orbit className="size-4.5" />
    </span>
    <span className="text-lg">
      Skill<span className="text-primary">Sphere</span>
    </span>
  </Link>
);
