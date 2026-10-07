import { useRef, useState, type DragEvent } from "react";
import { FileUp } from "lucide-react";
import { Cn } from "@/frontend/lib/utils";

const MAX_BYTES = 5 * 1024 * 1024;

type ResumeDropzoneProps = {
  onFile: (file: File) => void;
  onReject: (reason: string) => void;
  disabled?: boolean;
};

/** Drag-and-drop (or click/keyboard) PDF picker. */
export const ResumeDropzone = ({ onFile, onReject, disabled }: ResumeDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const Accept = (file?: File) => {
    if (!file) return;
    if (file.type !== "application/pdf") return onReject("Please choose a PDF file.");
    if (file.size > MAX_BYTES) return onReject("That file is larger than 5 MB.");
    onFile(file);
  };

  const OnDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    Accept(event.dataTransfer.files[0]);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={OnDrop}
      className={Cn(
        "flex w-full flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
        "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-60",
        isDragging ? "border-primary bg-primary/5" : "hover:border-primary/50 hover:bg-accent/40",
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <FileUp className="size-6" />
      </div>
      <div>
        <p className="font-medium">Drop your resume here, or click to browse</p>
        <p className="text-sm text-muted-foreground">PDF up to 5 MB · text-based PDFs work best</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => {
          Accept(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </button>
  );
};
