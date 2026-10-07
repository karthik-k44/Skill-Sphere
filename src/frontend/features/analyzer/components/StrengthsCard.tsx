import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card";

export const StrengthsCard = ({ strengths }: { strengths: string[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Strengths</CardTitle>
    </CardHeader>
    <CardContent>
      {strengths.length === 0 ? (
        <p className="text-sm text-muted-foreground">No clear strengths identified yet — add more detail to your profile.</p>
      ) : (
        <ul className="space-y-3">
          {strengths.map((strength) => (
            <li key={strength} className="flex gap-3 text-sm leading-6">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
              {strength}
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);
