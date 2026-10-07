import { Loader2, PlayCircle } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Separator } from "@/frontend/components/ui/separator";
import { authService } from "../services";

/** One click into a pre-filled account — for recruiters who don't want to sign up. */
export const DemoLoginButton = ({ onSuccess }: { onSuccess: () => void }) => {
  const demo = authService.useDemoLoginMutation();

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase">
        <Separator className="flex-1" /> or <Separator className="flex-1" />
      </div>
      <Button variant="outline" className="w-full" onClick={() => demo.mutate(undefined, { onSuccess })} disabled={demo.isPending}>
        {demo.isPending ? <Loader2 className="animate-spin" /> : <PlayCircle />}
        Try the demo account
      </Button>
    </div>
  );
};
