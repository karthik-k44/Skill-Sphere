import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, FileText, Sparkles, Target } from "lucide-react";
import { Logo } from "@/frontend/components/layout/Logo";
import { ThemeToggle } from "@/frontend/components/layout/ThemeToggle";
import { paths } from "@/frontend/config/paths";

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

/**
 * Exactly one screen tall: the page never scrolls. On very short screens only the form column
 * scrolls inside itself. Studio Mist story panel (desktop) beside a white form column.
 */
export const AuthLayout = ({ title, description, children, footer }: AuthLayoutProps) => (
  <div className="grid h-svh overflow-hidden lg:grid-cols-2">
    <aside className="hidden min-h-0 flex-col bg-canvas p-10 lg:flex xl:p-12 dark:bg-card">
      <Logo />
      <div className="mt-auto max-w-md space-y-8">
        <h2 className="text-headline font-semibold xl:text-display">Turn what you know into a career-ready story.</h2>
        <ul className="space-y-4">
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

    <main className="flex min-h-0 flex-col overflow-y-auto px-6 py-5 sm:px-10 sm:py-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          to={paths.home}
          className="inline-flex items-center gap-1.5 rounded-full py-1 pr-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden /> Back to home
        </Link>
        <ThemeToggle />
      </div>
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-5 py-6">
        <Logo className="lg:hidden" />
        <div className="space-y-1.5">
          <h1 className="text-headline font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {children}
        <p className="text-center text-sm text-muted-foreground">{footer}</p>
      </div>
    </main>
  </div>
);
