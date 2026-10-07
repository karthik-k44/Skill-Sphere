import { z } from "zod";

export const GithubUsernameParamsSchema = z.object({
  username: z
    .string()
    .trim()
    .regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, "Enter a valid GitHub username"),
});
