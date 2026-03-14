import { z } from "zod";

export const IssueCommentSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
  issue_id: z.string().uuid().optional(),
  users_id: z.string().uuid().optional(),
});

export type IssueCommentInputSchema = z.infer<typeof IssueCommentSchema>;
