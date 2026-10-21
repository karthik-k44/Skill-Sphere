import { Link } from "react-router-dom";
import { Button } from "@/frontend/components/ui/button";
import { paths } from "@/frontend/config/paths";
import { STEPS } from "../lib/landing-content";

/** Editorial white section: kicker, left-aligned statement, three hairline-topped steps, quiet CTA. */
export const HowItWorksSection = () => (
  <section id="how-it-works" className="scroll-mt-14 py-section">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <p className="font-display text-kicker font-semibold">How it works</p>
      <h2 className="mt-3 max-w-3xl text-headline font-semibold sm:text-display">
        Three steps. About ten minutes. Then you know exactly what to work on.
      </h2>
      <ol className="mt-14 grid gap-10 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step.title} className="border-t pt-6">
            <span className="font-display text-feature font-semibold text-muted-foreground tabular-nums">
              0{index + 1}
            </span>
            <h3 className="mt-4 text-title font-semibold">{step.title}</h3>
            <p className="mt-2 text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
      <div className="mt-section flex flex-col items-center gap-6 text-center">
        <h3 className="max-w-2xl text-headline font-semibold sm:text-feature">Ready to see your score?</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <Link to={paths.signup}>Create free account</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to={paths.login}>Log in</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);
