import { Link } from "react-router-dom";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/frontend/components/ui/navigation-menu";
import { publicFeatureLinks } from "@/frontend/config/navigation";
import { paths } from "@/frontend/config/paths";

/**
 * "Features ▾" trigger and its full-width panel: a small uppercase label over a 3×2 grid of quiet
 * feature cards (icon top-left, title and one line of copy at the bottom).
 */
export const FeaturesMegaMenu = ({ isSignedIn }: { isSignedIn: boolean }) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
    <NavigationMenuContent className="p-5 md:w-[calc(min(100vw,80rem)-3rem)]">
      <p className="px-1 pb-3 text-xs tracking-[0.08em] text-muted-foreground uppercase">Features</p>
      <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {publicFeatureLinks.map(({ title, description, icon: Icon, appPath }) => (
          <li key={title}>
            <NavigationMenuLink asChild>
              <Link
                to={isSignedIn ? appPath : paths.signup}
                className="flex min-h-36 flex-col justify-between gap-6 rounded-2xl bg-canvas p-5 transition-colors hover:bg-control focus-visible:bg-control dark:bg-muted"
              >
                <Icon className="size-[18px] text-muted-foreground" strokeWidth={1.5} aria-hidden />
                <span className="space-y-1">
                  <span className="block font-display text-title font-medium text-foreground">{title}</span>
                  <span className="block text-sm text-muted-foreground">{description}</span>
                </span>
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
);
