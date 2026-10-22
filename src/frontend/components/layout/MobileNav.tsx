import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/frontend/components/ui/sheet";
import { publicFeatureLinks } from "@/frontend/config/navigation";
import { paths } from "@/frontend/config/paths";

type MobileNavProps = { isSignedIn: boolean; links: { label: string; href: string }[]; actions: ReactNode };

export const MobileNav = ({ isSignedIn, links, actions }: MobileNavProps) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon-sm" aria-label="Open menu" className="md:hidden">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-80 overflow-y-auto bg-frost">
      <SheetHeader>
        <SheetTitle className="text-xs font-normal tracking-[0.08em] text-muted-foreground uppercase">Features</SheetTitle>
      </SheetHeader>
      <nav aria-label="Mobile" className="flex flex-col gap-6 px-4 pb-6">
        <ul className="grid gap-2">
          {publicFeatureLinks.map(({ title, description, icon: Icon, appPath }) => (
            <li key={title}>
              <Link
                to={isSignedIn ? appPath : paths.signup}
                className="flex gap-3 rounded-2xl bg-background p-4 transition-colors hover:bg-control"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden />
                <span>
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="block text-xs text-muted-foreground">{description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-1">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm hover:bg-muted">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2">{actions}</div>
      </nav>
    </SheetContent>
  </Sheet>
);
