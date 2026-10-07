import { Card, CardContent } from "@/frontend/components/ui/card";
import { FEATURES } from "../lib/landing-content";

export const FeaturesSection = () => (
  <section id="features" className="scroll-mt-20 border-y bg-muted/30 py-24">
    <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything between “I should apply” and “I applied”</h2>
        <p className="text-lg text-muted-foreground">One profile powers every tool, so you only enter your details once.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="group transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
            <CardContent className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
