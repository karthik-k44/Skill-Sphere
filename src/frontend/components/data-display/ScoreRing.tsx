import { Cn } from "@/frontend/lib/utils";

type ScoreRingProps = {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
};

/** Circular 0–100 gauge. The arc colour follows the same bands as `ScoreTone`. */
export const ScoreRing = ({ value, size = 128, strokeWidth = 10, label = "Score", className }: ScoreRingProps) => {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const stroke = clamped >= 75 ? "var(--success)" : clamped >= 50 ? "var(--warning)" : "var(--destructive)";

  return (
    <div
      className={Cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label}: ${clamped} out of 100`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--muted)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (clamped / 100) * circumference}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tabular-nums">{clamped}</span>
        <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">{label}</span>
      </div>
    </div>
  );
};
