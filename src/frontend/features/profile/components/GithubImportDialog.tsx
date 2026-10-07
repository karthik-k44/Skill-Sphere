import { useState, type FormEvent } from "react";
import { useFormikContext } from "formik";
import { Github, Loader2, Search } from "lucide-react";
import { ErrorState } from "@/frontend/components/feedback/ErrorState";
import { Button } from "@/frontend/components/ui/button";
import { Checkbox } from "@/frontend/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/frontend/components/ui/dialog";
import { Input } from "@/frontend/components/ui/input";
import { Label } from "@/frontend/components/ui/label";
import { ToastManager } from "@/frontend/lib/toast-manager";
import { ApplyGithubImport, GithubUsernameFromUrl } from "../lib/github-import";
import { githubService } from "../services";
import type { ProfileFormValues } from "../types";
import { GithubRepoList } from "./GithubRepoList";

export const GithubImportDialog = () => {
  const formik = useFormikContext<ProfileFormValues>();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(() => GithubUsernameFromUrl(formik.values.links.github));
  const [username, setUsername] = useState("");
  const [selected, setSelected] = useState<Set<string> | null>(null);
  const [includeLanguages, setIncludeLanguages] = useState(true);
  const repos = githubService.useGithubRepos(username);

  // Default to the six most-starred repos until the user changes the selection.
  const chosen = selected ?? new Set(repos.data?.repos.slice(0, 6).map((repo) => repo.name));

  const OnSearch = (event: FormEvent) => {
    event.preventDefault();
    setSelected(null);
    setUsername(draft.trim());
  };

  const Toggle = (name: string) => {
    const next = new Set(chosen);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setSelected(next);
  };

  const Apply = () => {
    if (!repos.data) return;
    formik.setValues(ApplyGithubImport(formik.values, repos.data, chosen, includeLanguages));
    ToastManager.Success(`Imported ${chosen.size} project${chosen.size === 1 ? "" : "s"} from GitHub`, "Press Save to keep them.");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="w-full justify-start">
          <Github /> Import from GitHub
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import projects from GitHub</DialogTitle>
          <DialogDescription>Pick public repositories to add as projects. Forks are skipped.</DialogDescription>
        </DialogHeader>
        <form onSubmit={OnSearch} className="flex gap-2">
          <Input aria-label="GitHub username" placeholder="GitHub username" value={draft} onChange={(event) => setDraft(event.target.value)} />
          <Button type="submit" disabled={!draft.trim() || repos.isFetching}>
            {repos.isFetching ? <Loader2 className="animate-spin" /> : <Search />} Find
          </Button>
        </form>
        {repos.error && <ErrorState title="Couldn't load repositories" error={repos.error} />}
        {repos.data && repos.data.repos.length === 0 && (
          <p className="text-sm text-muted-foreground">No public, non-fork repositories found for {repos.data.username}.</p>
        )}
        {repos.data && repos.data.repos.length > 0 && (
          <>
            <GithubRepoList repos={repos.data.repos} selected={chosen} onToggle={Toggle} />
            <div className="flex items-center gap-2">
              <Checkbox id="gh-languages" checked={includeLanguages} onCheckedChange={(value) => setIncludeLanguages(value === true)} />
              <Label htmlFor="gh-languages" className="font-normal">
                Also add languages as skills ({repos.data.languages.map((language) => language.name).join(", ") || "none"})
              </Label>
            </div>
            <DialogFooter>
              <Button onClick={Apply} disabled={chosen.size === 0 && !includeLanguages}>
                Add {chosen.size} project{chosen.size === 1 ? "" : "s"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
