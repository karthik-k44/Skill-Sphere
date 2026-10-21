import { Link } from "react-router-dom";
import { Button } from "@/frontend/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/frontend/components/ui/navigation-menu";
import { FeaturesMegaMenu } from "@/frontend/components/layout/FeaturesMegaMenu";
import { Logo } from "@/frontend/components/layout/Logo";
import { MobileNav } from "@/frontend/components/layout/MobileNav";
import { ThemeToggle } from "@/frontend/components/layout/ThemeToggle";
import { paths } from "@/frontend/config/paths";
import { authService } from "@/frontend/features/auth/services";

const LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Contact", href: "/#contact" },
];

const AuthActions = ({ isSignedIn }: { isSignedIn: boolean }) =>
  isSignedIn ? (
    <Button variant="ink" size="sm" asChild>
      <Link to={paths.app.dashboard}>Open dashboard</Link>
    </Button>
  ) : (
    <>
      <Button variant="secondary" size="sm" asChild>
        <Link to={paths.login}>Log in</Link>
      </Button>
      <Button variant="ink" size="sm" asChild>
        <Link to={paths.signup}>Get started</Link>
      </Button>
    </>
  );

/**
 * Glass nav bar: logo, a "Features" mega-menu and plain links on the left, compact Log in / Get
 * started pills on the right. The whole bar is the NavigationMenu root so the panel spans its width.
 */
export const PublicHeader = () => {
  const { data: user } = authService.useSession();
  const isSignedIn = Boolean(user);

  return (
    <header className="sticky top-0 z-40 bg-background/75 backdrop-blur-xl">
      <NavigationMenu className="mx-auto h-14 w-full max-w-7xl justify-between gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Logo />
          <NavigationMenuList className="hidden md:flex">
            <FeaturesMegaMenu isSignedIn={isSignedIn} />
            {LINKS.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <a href={link.href}>{link.label}</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </div>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <div className="hidden items-center gap-1.5 md:flex">
            <AuthActions isSignedIn={isSignedIn} />
          </div>
          <MobileNav isSignedIn={isSignedIn} links={LINKS} actions={<AuthActions isSignedIn={isSignedIn} />} />
        </div>
      </NavigationMenu>
    </header>
  );
};
