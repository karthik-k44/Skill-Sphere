import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/frontend/components/ui/chart";
import type { AnalysisScoresType } from "../types";

const chartConfig = { score: { label: "Score", color: "var(--chart-1)" } } satisfies ChartConfig;

const LABELS: Record<keyof AnalysisScoresType, string> = {
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  presentation: "Presentation",
};

export const AreaScoresChart = ({ scores }: { scores: AnalysisScoresType }) => {
  const data = (Object.keys(LABELS) as (keyof AnalysisScoresType)[]).map((key) => ({
    area: LABELS[key],
    score: scores[key],
  }));

  return (
    <figure className="space-y-2">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-72">
        <RadarChart data={data} outerRadius="72%">
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarGrid />
          <PolarAngleAxis dataKey="area" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar dataKey="score" fill="var(--color-score)" fillOpacity={0.35} stroke="var(--color-score)" strokeWidth={2} />
        </RadarChart>
      </ChartContainer>
      {/* Text equivalent of the chart for screen readers and quick scanning. */}
      <figcaption>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3">
          {data.map((item) => (
            <li key={item.area} className="flex justify-between gap-2">
              <span className="text-muted-foreground">{item.area}</span>
              <span className="font-medium tabular-nums">{item.score}</span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
};
