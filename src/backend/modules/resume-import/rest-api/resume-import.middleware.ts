import multer from "multer";
import { BadRequest } from "@/backend/common/errors/app-error";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

/** Keeps the upload in memory (it is parsed and discarded, never written to disk). */
export const ResumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_RESUME_BYTES, files: 1 },
  fileFilter: (_req, file, done) => {
    if (file.mimetype === "application/pdf") return done(null, true);
    return done(BadRequest("Only PDF resumes are supported."));
  },
}).single("file");
