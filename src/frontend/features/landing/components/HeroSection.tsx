import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { paths } from "@/frontend/config/paths";
import { authService } from "@/frontend/features/auth/services";
import { HERO_TAGS, HERO_WORDS } from "../lib/landing-content";
import { ProductPreview } from "./ProductPreview";
import { ShowcaseCollage } from "./ShowcaseCollage";

/** Inline style for a staggered `animate-fade-up` entrance. */
const Delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/** Stacked three-word statement left, the product "render" right, tags beneath, collage below. */
export const HeroSection = () => {
  const navigate = useNavigate();
  const { data: user } = authService.useSession();
  const demo = authService.useDemoLoginMutation();

  return (
    <section className="px-4 pt-2 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-card bg-canvas dark:bg-card">
        <div className="grid items-center gap-14 px-6 pt-14 pb-16 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          <div>
            <p className="animate-fade-up font-display text-kicker font-semibold">AI career toolkit for developers</p>
            <h1 className="mt-5 font-display text-[56px] leading-[1.02] font-semibold tracking-[-0.015em] sm:text-hero">
              {HERO_WORDS.map((word, index) => (
                <span key={word} className="block animate-fade-up" style={Delay(120 + index * 110)}>
                  {word}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-md animate-fade-up text-muted-foreground" style={Delay(480)}>
              One profile in. An honest readiness score, a job-by-job match, a learning roadmap and a resume you can
              send today.
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3" style={Delay(580)}>
              {user ? (
                <Button size="lg" asChild>
                  <Link to={paths.app.dashboard}>
                    Open dashboard <ArrowRight />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link to={paths.signup}>Create free account</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    disabled={demo.isPending}
                    onClick={() => demo.mutate(undefined, { onSuccess: () => navigate(paths.app.dashboard) })}
                  >
                    {demo.isPending && <Loader2 className="animate-spin" />} Try the live demo
                  </Button>
                </>
              )}
            </div>
            <ul aria-label="What's inside" className="mt-10 flex flex-wrap gap-1.5">
              {HERO_TAGS.map((tag, index) => (
                <li
                  key={tag}
                  className="animate-fade-up bg-background px-2 py-1 text-[11px] tracking-[0.06em] text-muted-foreground uppercase dark:bg-muted"
                  style={Delay(680 + index * 50)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <ProductPreview />
        </div>
        <ShowcaseCollage />
      </div>
    </section>
  );
};
