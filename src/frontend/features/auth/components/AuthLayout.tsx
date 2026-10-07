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

export const AuthLayout = ({ title, description, children, footer }: AuthLayoutProps) => (
  <div className="grid min-h-svh lg:grid-cols-2">
    <aside className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col">
      <div className="absolute -top-24 -right-24 size-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-16 size-96 rounded-full bg-black/10 blur-3xl" />
      <Logo className="relative text-primary-foreground [&>span:first-child]:bg-white [&>span:first-child]:text-primary [&_.text-primary]:text-white/80" />
      <div className="relative mt-auto max-w-md space-y-8">
        <h2 className="text-3xl leading-tight font-bold">Turn what you know into a career-ready story.</h2>
        <ul className="space-y-4">
          {HIGHLIGHTS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 text-primary-foreground/90">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-white/15">
                <Icon className="size-4" />
              </span>
              {text}
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
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
        <p className="text-center text-sm text-muted-foreground">{footer}</p>
      </div>
    </main>
  </div>
);
