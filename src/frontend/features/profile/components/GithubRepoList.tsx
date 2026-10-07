import { Star } from "lucide-react";
import { Badge } from "@/frontend/components/ui/badge";
import { Checkbox } from "@/frontend/components/ui/checkbox";
import { ScrollArea } from "@/frontend/components/ui/scroll-area";
import type { GithubRepoType } from "../types";

type GithubRepoListProps = {
  repos: GithubRepoType[];
  selected: Set<string>;
  onToggle: (name: string) => void;
};

export const GithubRepoList = ({ repos, selected, onToggle }: GithubRepoListProps) => (
  <ScrollArea className="h-72 rounded-lg border">
    <ul className="divide-y">
      {repos.map((repo) => {
        const id = `repo-${repo.name}`;
        return (
          <li key={repo.name}>
            <label htmlFor={id} className="flex cursor-pointer items-start gap-3 p-3 hover:bg-accent/50">
              <Checkbox
                id={id}
                className="mt-0.5"
                checked={selected.has(repo.name)}
                onCheckedChange={() => onToggle(repo.name)}
              />
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium">{repo.name}</span>
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                      <Star className="size-3" /> {repo.stars}
                    </span>
                  )}
                </div>
                {repo.description && <p className="line-clamp-2 text-sm text-muted-foreground">{repo.description}</p>}
                {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  </ScrollArea>
);
