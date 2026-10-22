import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { paths } from "@/frontend/config/paths";
import { Cn } from "@/frontend/lib/utils";

/** Explains why an AI action is disabled on the shared demo account (the server blocks it too). */
export const DemoLockNotice = ({ feature, className }: { feature: string; className?: string }) => (
  <p className={Cn("flex gap-3 rounded-[20px] bg-muted p-4 text-sm text-muted-foreground", className)}>
    <Lock className="mt-0.5 size-4 shrink-0" aria-hidden />
    <span>
      {feature} is turned off in the demo, so the results here are sample data.{" "}
      <Link to={paths.signup} className="text-link hover:underline">
        Create a free account
      </Link>{" "}
      to run it on your own profile.
    </span>
  </p>
);
