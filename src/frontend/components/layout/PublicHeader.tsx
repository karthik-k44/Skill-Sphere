import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/frontend/components/ui/sheet";
import { Logo } from "@/frontend/components/layout/Logo";
import { ThemeToggle } from "@/frontend/components/layout/ThemeToggle";
import { paths } from "@/frontend/config/paths";
import { authService } from "@/frontend/features/auth/services";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Contact", href: "/#contact" },
];

const AuthActions = ({ isSignedIn }: { isSignedIn: boolean }) =>
  isSignedIn ? (
    <Button asChild>
      <Link to={paths.app.dashboard}>Open dashboard</Link>
    </Button>
  ) : (
    <>
      <Button variant="ghost" asChild>
        <Link to={paths.login}>Log in</Link>
      </Button>
      <Button asChild>
        <Link to={paths.signup}>Get started</Link>
      </Button>
    </>
  );

export const PublicHeader = () => {
  const { data: user } = authService.useSession();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <AuthActions isSignedIn={Boolean(user)} />
        </div>
        <div className="ml-auto flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {LINKS.map((link) => (
                  <a key={link.href} href={link.href} className="rounded-md px-3 py-2 hover:bg-accent">
                    {link.label}
                  </a>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <AuthActions isSignedIn={Boolean(user)} />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
