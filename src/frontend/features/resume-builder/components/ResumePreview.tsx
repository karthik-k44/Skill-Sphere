import { useEffect } from "react";
import { usePDF } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import { ErrorState } from "@/frontend/components/feedback/ErrorState";
import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import type { ResumeDataType, ResumeOptionsType } from "../types";
import { ResumeDocument } from "./ResumeDocument";

type ResumePreviewProps = { data: ResumeDataType; options: ResumeOptionsType };

/** Renders the PDF once per change and uses the same blob for both the preview and the download. */
export const ResumePreview = ({ data, options }: ResumePreviewProps) => {
  const [pdf, updatePdf] = usePDF({ document: <ResumeDocument data={data} options={options} /> });
  const fileName = `${data.name.replace(/\s+/g, "-") || "resume"}-resume.pdf`;

  useEffect(() => {
    updatePdf(<ResumeDocument data={data} options={options} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- updatePdf is not referentially stable
  }, [data, options]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="flex items-center gap-2 text-base">
          Preview {pdf.loading && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
        </CardTitle>
        <Button asChild disabled={!pdf.url}>
          <a href={pdf.url ?? undefined} download={fileName} aria-disabled={!pdf.url}>
            <Download /> Download PDF
          </a>
        </Button>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {pdf.error ? (
          <div className="p-6">
            <ErrorState title="Couldn't render the PDF" error={new Error(String(pdf.error))} />
          </div>
        ) : pdf.url ? (
          <iframe src={`${pdf.url}#toolbar=0&view=FitH`} title="Resume preview" className="h-[75vh] min-h-[560px] w-full border-t bg-muted" />
        ) : (
          <div className="flex h-[75vh] min-h-[560px] items-center justify-center border-t bg-muted text-sm text-muted-foreground">
            Rendering your resume…
          </div>
        )}
      </CardContent>
    </Card>
  );
};
