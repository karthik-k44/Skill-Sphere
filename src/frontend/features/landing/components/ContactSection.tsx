import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/frontend/components/ui/card";
import { ContactForm } from "./ContactForm";

export const ContactSection = () => (
  <section id="contact" className="scroll-mt-20 border-t bg-muted/30 py-24">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-2">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Questions or feedback?</h2>
          <p className="text-lg text-muted-foreground">
            Tell us what you're working towards or which part of SkillSphere you'd like help with.
          </p>
        </div>
        <div className="flex gap-3 rounded-xl border bg-card p-4">
          <Lightbulb className="mt-0.5 size-5 shrink-0 text-warning" />
          <p className="text-sm text-muted-foreground">
            Tip: complete your skills, projects and experience before running the analyzer — the more it knows, the
            more specific the advice.
          </p>
        </div>
      </div>
      <Card className="lg:col-span-3">
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  </section>
);
