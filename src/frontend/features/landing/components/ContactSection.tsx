import { Lightbulb } from "lucide-react";
import { ContactForm } from "./ContactForm";

/** White section; the form sits on a #f5f5f7 28px stage so its white fields read clearly. */
export const ContactSection = () => (
  <section id="contact" className="scroll-mt-14 py-section">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-2">
        <p className="font-display text-kicker font-semibold">Contact</p>
        <h2 className="text-headline font-semibold sm:text-feature">Questions or feedback?</h2>
        <p className="text-muted-foreground">
          Tell us what you're working towards, or which part of SkillSphere you'd like help with.
        </p>
        <p className="flex gap-3 text-sm text-muted-foreground">
          <Lightbulb className="mt-0.5 size-4 shrink-0" aria-hidden />
          Complete your skills, projects and experience before running the analyzer. The more it knows, the more
          specific the advice.
        </p>
      </div>
      <div className="rounded-card bg-canvas p-7 sm:p-10 lg:col-span-3 dark:bg-card">
        <ContactForm />
      </div>
    </div>
  </section>
);
