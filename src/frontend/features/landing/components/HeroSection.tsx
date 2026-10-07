import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, PlayCircle } from "lucide-react";
import { Badge } from "@/frontend/components/ui/badge";
import { Button } from "@/frontend/components/ui/button";
import { paths } from "@/frontend/config/paths";
import { authService } from "@/frontend/features/auth/services";
import { ProductPreview } from "./ProductPreview";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { data: user } = authService.useSession();
  const demo = authService.useDemoLoginMutation();

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-2 lg:pt-24">
        <div className="space-y-8">
          <Badge variant="secondary" className="px-3 py-1">AI career toolkit for developers</Badge>
          <div className="space-y-5">
            <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Know where you stand. <span className="text-primary">Know what to learn next.</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              SkillSphere turns your skills, projects and experience into an honest readiness score, a job-by-job
              match, a learning roadmap and a resume you can send today.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {user ? (
              <Button size="lg" asChild>
                <Link to={paths.app.dashboard}>Open dashboard <ArrowRight /></Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to={paths.signup}>Create free account <ArrowRight /></Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  disabled={demo.isPending}
                  onClick={() => demo.mutate(undefined, { onSuccess: () => navigate(paths.app.dashboard) })}
                >
                  {demo.isPending ? <Loader2 className="animate-spin" /> : <PlayCircle />} Try the live demo
                </Button>
              </>
            )}
          </div>
          {!user && (
            <p className="text-sm text-muted-foreground">
              No credit card. The demo account is pre-filled so you can explore every feature.
            </p>
          )}
        </div>
        <ProductPreview />
      </div>
    </section>
  );
};
