import { useId, useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Badge } from "@/frontend/components/ui/badge";
import { Input } from "@/frontend/components/ui/input";

type TagInputProps = {
  id?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  max?: number;
};

/** Type and press Enter (or comma) to add a tag; Backspace on empty input removes the last one. */
export const TagInput = ({ id, value, onChange, placeholder, suggestions = [], max = 20 }: TagInputProps) => {
  const [draft, setDraft] = useState("");
  const listId = useId();

  const Add = (raw: string) => {
    const tag = raw.trim().replace(/,$/, "");
    const exists = value.some((item) => item.toLowerCase() === tag.toLowerCase());
    if (tag && !exists && value.length < max) onChange([...value, tag]);
    setDraft("");
  };

  const OnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      Add(draft);
    } else if (event.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border bg-transparent px-2 py-1.5 shadow-xs focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-input/30">
      {value.map((tag) => (
        <Badge key={tag} variant="secondary" className="gap-1 pr-1">
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((item) => item !== tag))}
            className="rounded-sm opacity-60 hover:opacity-100"
            aria-label={`Remove ${tag}`}
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      <Input
        id={id}
        value={draft}
        list={suggestions.length ? listId : undefined}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={OnKeyDown}
        onBlur={() => draft && Add(draft)}
        placeholder={value.length ? "" : placeholder}
        className="h-6 min-w-24 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      {suggestions.length > 0 && (
        <datalist id={listId}>
          {suggestions.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      )}
    </div>
  );
};
