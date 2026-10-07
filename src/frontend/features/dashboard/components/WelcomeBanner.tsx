import { Link } from "react-router-dom";
import { Sparkles, Target } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { paths } from "@/frontend/config/paths";

const Greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

type WelcomeBannerProps = { name: string; headline: string };

export const WelcomeBanner = ({ name, headline }: WelcomeBannerProps) => (
  <section className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
    <div aria-hidden className="absolute -top-20 -right-10 size-64 rounded-full bg-white/10 blur-2xl" />
    <div aria-hidden className="absolute -bottom-24 left-1/3 size-64 rounded-full bg-black/10 blur-3xl" />
    <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <p className="text-sm text-primary-foreground/80">{Greeting()},</p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{name.split(" ")[0]}</h1>
        <p className="max-w-xl text-primary-foreground/85">
          {headline || "Here's where your career profile stands today."}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" asChild>
          <Link to={paths.app.analyzer}>
            <Sparkles /> Analyze profile
          </Link>
        </Button>
        <Button variant="outline" className="border-white/30 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground" asChild>
          <Link to={paths.app.jobMatch}>
            <Target /> Match a job
          </Link>
        </Button>
      </div>
    </div>
  </section>
);
