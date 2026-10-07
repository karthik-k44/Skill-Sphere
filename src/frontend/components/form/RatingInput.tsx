import { Star } from "lucide-react";
import { Cn } from "@/frontend/lib/utils";

type RatingInputProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  label?: string;
};

/** Accessible 1–max star rating rendered as a radio group. */
export const RatingInput = ({ value, onChange, max = 5, label = "Rating" }: RatingInputProps) => (
  <div role="radiogroup" aria-label={label} className="flex items-center gap-0.5">
    {Array.from({ length: max }, (_, index) => {
      const rating = index + 1;
      const isActive = rating <= value;
      return (
        <button
          key={rating}
          type="button"
          role="radio"
          aria-checked={rating === value}
          aria-label={`${rating} of ${max}`}
          onClick={() => onChange(rating)}
          className="rounded-sm p-0.5 transition-transform outline-none hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Star
            className={Cn("size-4", isActive ? "fill-warning text-warning" : "text-muted-foreground/40")}
          />
        </button>
      );
    })}
  </div>
);
