import type { ReactNode } from "react";
import { BarChart3, FileText, Sparkles, Target } from "lucide-react";
import { Logo } from "@/frontend/components/layout/Logo";
import { ThemeToggle } from "@/frontend/components/layout/ThemeToggle";

const HIGHLIGHTS = [
  { icon: Sparkles, text: "AI scores your profile and tells you exactly what to improve" },
  { icon: Target, text: "Paste any job posting to see your match and missing skills" },
  { icon: BarChart3, text: "Track a personal learning roadmap step by step" },
  { icon: FileText, text: "Export a clean, ATS-friendly PDF resume in one click" },
];

type AuthLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

/** Studio Mist story panel (desktop) beside a white form column. No colour blocks, no gradients. */
export const AuthLayout = ({ title, description, children, footer }: AuthLayoutProps) => (
  <div className="grid min-h-svh lg:grid-cols-2">
    <aside className="hidden flex-col bg-canvas p-12 lg:flex dark:bg-card">
      <Logo />
      <div className="mt-auto max-w-md space-y-10">
        <h2 className="text-display font-semibold">Turn what you know into a career-ready story.</h2>
        <ul className="space-y-5">
          {HIGHLIGHTS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background">
                <Icon className="size-4" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="pt-1.5 text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>

    <main className="flex flex-col p-6 sm:p-10">
      <div className="flex items-center justify-between">
        <Logo className="lg:invisible" />
        <ThemeToggle />
      </div>
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 py-10">
        <div className="space-y-2">
          <h1 className="text-headline font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {children}
        <p className="text-center text-sm text-muted-foreground">{footer}</p>
      </div>
    </main>
  </div>
);
