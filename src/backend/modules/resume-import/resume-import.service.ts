import { extractText, getDocumentProxy } from "unpdf";
import { BadRequest } from "@/backend/common/errors/app-error";
import { aiService } from "@/backend/common/services/ai.service";
import {
  BuildResumeImportPrompt,
  RESUME_IMPORT_SYSTEM_PROMPT,
} from "@/backend/modules/resume-import/resume-import.prompt";
import { ResumeDraftSchema } from "@/backend/modules/resume-import/resume-import.validators";

const MIN_TEXT_LENGTH = 120;
const MAX_TEXT_LENGTH = 15000;

const ReadPdfText = async (buffer: Buffer) => {
  try {
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, { mergePages: true });
    return text.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  } catch {
    throw BadRequest("This file could not be read as a PDF.");
  }
};

/**
 * Turns an uploaded resume into a profile draft. Nothing is saved: the client shows the draft
 * so the user can review it before it replaces anything in their profile.
 */
const ParseResume = async (file: Express.Multer.File | undefined) => {
  if (!file) throw BadRequest("Attach a PDF resume in the `file` field.");

  const text = await ReadPdfText(file.buffer);
  if (text.length < MIN_TEXT_LENGTH) {
    throw BadRequest("We couldn't find readable text in this PDF. Scanned images aren't supported yet.");
  }

  const { data } = await aiService.GenerateJson({
    system: RESUME_IMPORT_SYSTEM_PROMPT,
    prompt: BuildResumeImportPrompt(text.slice(0, MAX_TEXT_LENGTH)),
    schema: ResumeDraftSchema,
    maxTokens: 3000,
    temperature: 0.1,
  });
  return data;
};

export const resumeImportService = { ParseResume };
