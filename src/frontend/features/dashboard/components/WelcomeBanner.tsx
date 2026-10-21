import { Link } from "react-router-dom";
import { Button } from "@/frontend/components/ui/button";
import { paths } from "@/frontend/config/paths";

const Greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

type WelcomeBannerProps = { name: string; headline: string };

/** Product-stage intro: kicker, large Ink name, Slate headline, blue pill + outlined pill. No colour block. */
export const WelcomeBanner = ({ name, headline }: WelcomeBannerProps) => (
  <section className="flex flex-col gap-6 rounded-card bg-card p-7 sm:p-10 md:flex-row md:items-end md:justify-between">
    <div className="space-y-3">
      <p className="font-display text-kicker font-semibold text-muted-foreground">{Greeting()},</p>
      <h1 className="text-display font-semibold">{name.split(" ")[0]}.</h1>
      <p className="max-w-xl text-muted-foreground">{headline || "Here's where your career profile stands today."}</p>
    </div>
    <div className="flex flex-wrap gap-2">
      <Button asChild>
        <Link to={paths.app.analyzer}>Analyze profile</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link to={paths.app.jobMatch}>Match a job</Link>
      </Button>
    </div>
  </section>
);
