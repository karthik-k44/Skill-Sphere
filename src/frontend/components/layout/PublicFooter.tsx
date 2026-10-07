import { Link } from "react-router-dom";
import { Logo } from "@/frontend/components/layout/Logo";
import { paths } from "@/frontend/config/paths";

export const PublicFooter = () => (
  <footer className="border-t">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="space-y-2">
        <Logo />
        <p className="max-w-sm text-sm text-muted-foreground">
          Build a stronger profile, see where you stand, and walk into applications prepared.
        </p>
      </div>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <a href="/#features" className="hover:text-foreground">Features</a>
        <a href="/#how-it-works" className="hover:text-foreground">How it works</a>
        <a href="/#contact" className="hover:text-foreground">Contact</a>
        <Link to={paths.publicProfile("demo")} className="hover:text-foreground">Sample profile</Link>
      </nav>
    </div>
    <p className="border-t py-4 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} SkillSphere. Built with React, Express and MongoDB.
    </p>
  </footer>
);
