import { Link } from "react-router-dom";
import { Reveal } from "@/frontend/components/motion/Reveal";
import { paths } from "@/frontend/config/paths";
import { FEATURES } from "../lib/landing-content";

/** Highlights band: #f5f5f7 full-width, heading with a blue text link opposite, white 28px cards. */
export const FeaturesSection = () => (
  <section id="features" className="scroll-mt-14 bg-canvas py-section dark:bg-background">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="max-w-2xl text-headline font-semibold sm:text-display">
          Everything between “I should apply” and “I applied.”
        </h2>
        <Link to={paths.signup} className="text-link hover:underline">
          Start free ›
        </Link>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, description }, index) => (
          <Reveal
            as="article"
            key={title}
            delay={(index % 4) * 90}
            className="group flex min-h-60 flex-col justify-between gap-8 rounded-card bg-card p-7"
          >
            <Icon
              className="size-6 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:scale-110"
              strokeWidth={1.5}
              aria-hidden
            />
            <div className="space-y-2">
              <h3 className="text-title font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
