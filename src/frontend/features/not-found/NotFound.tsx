import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { paths } from "@/frontend/config/paths";
import { useDocumentTitle } from "@/frontend/hooks/use-document-title";

const NotFound = () => {
  useDocumentTitle("Page not found");

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Compass className="size-8" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="text-3xl font-bold tracking-tight">This page wandered off</h1>
        <p className="text-muted-foreground">The link may be broken, or the page may have moved.</p>
      </div>
      <div className="flex gap-2">
        <Button asChild>
          <Link to={paths.home}>Go home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={paths.app.dashboard}>Open dashboard</Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
