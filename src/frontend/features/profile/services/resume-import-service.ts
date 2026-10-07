import { useMutation } from "@tanstack/react-query";
import { PostFile } from "@/frontend/services/request";
import type { ProfileContentType } from "../types";

/** Returns a profile draft extracted from the PDF. Nothing is saved until the user applies and saves it. */
const ParseResume = (file: File) => PostFile<ProfileContentType>("/resume-import", file, "file", { timeout: 90_000 });

const useParseResumeMutation = () => useMutation({ mutationFn: ParseResume });

export const resumeImportService = { ParseResume, useParseResumeMutation };
