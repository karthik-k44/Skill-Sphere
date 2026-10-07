import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/frontend/components/ui/chart";
import type { SkillType } from "@/frontend/features/profile/types";

const chartConfig = { rating: { label: "Self-rating", color: "var(--chart-1)" } } satisfies ChartConfig;
const MAX_BARS = 8;

export const SkillsChart = ({ skills }: { skills: SkillType[] }) => {
  const data = [...skills]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, MAX_BARS)
    .map((skill) => ({ name: skill.name, rating: skill.rating }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top skills</CardTitle>
        <CardDescription>Your strongest {data.length} skills by self-rating (1–5).</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">Add skills to your profile to see them here.</p>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
            <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" width={110} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <ChartTooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltipContent hideLabel={false} />} />
              <Bar dataKey="rating" fill="var(--color-rating)" radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
