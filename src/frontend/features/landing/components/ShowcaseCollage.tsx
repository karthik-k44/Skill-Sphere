import { Check, Circle, Star } from "lucide-react";
import { AnimatedNumber } from "@/frontend/components/data-display/AnimatedNumber";
import { Reveal } from "@/frontend/components/motion/Reveal";

// Scalloped edge where the gray hero stage meets the collage: 48 shallow bumps across a 1200-wide box.
const SCALLOP_PATH = `M0 0H1200V6${Array.from({ length: 48 }, () => "q-12.5 12 -25 0").join(" ")}Z`;

const SKILLS = [
  { name: "React", value: 80 },
  { name: "TypeScript", value: 80 },
  { name: "Node.js", value: 60 },
  { name: "Docker", value: 40 },
];

const STEPS = [
  { label: "Write tests for two projects", done: true },
  { label: "Ship a REST API with auth", done: true },
  { label: "Learn GraphQL basics", done: false },
];

const tile = "flex flex-col justify-between overflow-hidden p-6";

/**
 * A mosaic of product moments under the hero (the collage in the reference), built from the app's own
 * vocabulary instead of photos. Decorative: one labelled image for assistive tech.
 */
export const ShowcaseCollage = () => (
  <div className="relative" role="img" aria-label="SkillSphere features: readiness score, skills, job match, roadmap and GitHub import">
    <svg viewBox="0 0 1200 12" preserveAspectRatio="none" aria-hidden className="absolute inset-x-0 top-0 z-10 h-3 w-full fill-canvas dark:fill-card">
      <path d={SCALLOP_PATH} />
    </svg>
    <div className="grid grid-flow-dense auto-rows-[170px] grid-cols-2 bg-background md:grid-cols-4 dark:bg-black" aria-hidden>
      <Reveal className={`${tile} row-span-2 bg-foreground text-background`}>
        <p className="text-xs tracking-[0.06em] uppercase opacity-70">Readiness score</p>
        <AnimatedNumber value={78} className="font-display text-[96px] leading-none font-semibold tracking-[-0.03em]" />
        <p className="text-sm opacity-70">Up 12 since last month</p>
      </Reveal>
      <Reveal delay={80} className={`${tile} bg-background`}>
        <p className="text-xs tracking-[0.06em] text-muted-foreground uppercase">Top skills</p>
        <div className="space-y-2">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="flex items-center gap-3 text-xs">
              <span className="w-20 shrink-0">{skill.name}</span>
              <span className="h-1.5 flex-1 rounded-full bg-control">
                <span
                  className="block h-full origin-left rounded-full bg-foreground group-data-[visible=true]/reveal:animate-grow-x"
                  style={{ width: `${skill.value}%` }}
                />
              </span>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={160} className={`${tile} col-span-2 bg-control md:flex-row md:items-end`}>
        <div>
          <p className="text-xs tracking-[0.06em] text-muted-foreground uppercase">Job match</p>
          <AnimatedNumber value={86} suffix="%" className="mt-2 block font-display text-display font-semibold" />
          <p className="text-sm text-muted-foreground">Frontend Engineer · Acme</p>
        </div>
        <div className="flex flex-wrap gap-1.5 text-xs md:max-w-[55%] md:justify-end">
          {["React", "TypeScript", "Accessibility"].map((skill) => (
            <span key={skill} className="bg-background px-2 py-1">{skill}</span>
          ))}
          <span className="bg-background px-2 py-1 text-warning">Missing: GraphQL</span>
        </div>
      </Reveal>
      <Reveal delay={120} className={`${tile} col-span-2 bg-background`}>
        <p className="text-xs tracking-[0.06em] text-muted-foreground uppercase">Learning roadmap · 66%</p>
        <ul className="space-y-2 text-sm">
          {STEPS.map((step) => (
            <li key={step.label} className="flex items-center gap-2">
              {step.done ? <Check className="size-4 text-success" /> : <Circle className="size-4 text-muted-foreground" />}
              <span className={step.done ? "text-muted-foreground line-through" : ""}>{step.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={200} className={`${tile} col-span-2 bg-foreground font-mono text-background md:col-span-1`}>
        <p className="font-sans text-xs tracking-[0.06em] uppercase opacity-70">From GitHub</p>
        <ul className="space-y-1.5 text-xs">
          {[["skill-sphere", 42], ["budget-buddy", 18], ["dotfiles", 7]].map(([repo, stars]) => (
            <li key={repo} className="flex justify-between gap-2">
              <span className="truncate">{repo}</span>
              <span className="flex items-center gap-1 opacity-70"><Star className="size-3" />{stars}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </div>
);
