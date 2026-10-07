import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { paths } from "@/frontend/config/paths";
import { STEPS } from "../lib/landing-content";

export const HowItWorksSection = () => (
  <section id="how-it-works" className="scroll-mt-20 py-24">
    <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
        <p className="text-lg text-muted-foreground">Three steps, about ten minutes.</p>
      </div>
      <ol className="grid gap-6 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step.title} className="relative rounded-2xl border p-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
        <div aria-hidden className="absolute -top-24 -left-24 size-72 rounded-full bg-white/10 blur-3xl" />
        <h3 className="relative text-2xl font-bold sm:text-3xl">Ready to see your score?</h3>
        <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/85">
          Create an account, import your resume, and get your first AI review in a couple of minutes.
        </p>
        <Button size="lg" variant="secondary" className="relative mt-6" asChild>
          <Link to={paths.signup}>
            Get started <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);
