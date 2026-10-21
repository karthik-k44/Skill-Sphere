import { Link } from "react-router-dom";
import { Logo } from "@/frontend/components/layout/Logo";
import { paths } from "@/frontend/config/paths";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Contact", href: "/#contact" },
];

/** Studio Mist footer with compact 12px links and a hairline divider. */
export const PublicFooter = () => (
  <footer className="bg-canvas text-xs text-muted-foreground dark:bg-background">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
      <div className="space-y-3">
        <Logo />
        <p className="max-w-sm">Build a stronger profile, see where you stand, and walk into applications prepared.</p>
      </div>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-foreground hover:underline">
            {link.label}
          </a>
        ))}
        <Link to={paths.publicProfile("demo")} className="hover:text-foreground hover:underline">
          Sample profile
        </Link>
      </nav>
    </div>
    <p className="mx-auto max-w-7xl border-t px-4 py-4 sm:px-6">
      © {new Date().getFullYear()} SkillSphere. Built with React, Express and MongoDB.
    </p>
  </footer>
);
