import { z } from "zod";


export const StatusEnum = z.enum(["CLOSED", "IN_PROGRESS", "OPEN", "REVIEW"]);
export const PriorityEnum = z.enum(["HIGH", "MEDIUM", "LOW"]);


export const IssueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  variant: z.string().optional(),
  description: z.string().optional(),
  labels: z.array(z.string()).optional(),
  status: StatusEnum.optional().default("IN_PROGRESS"),
  priority: PriorityEnum.optional().default("MEDIUM"),
  assignee: z.string().optional(),
  is_opened: z.boolean().optional().default(true),
  assign_to_id: z.string().uuid().optional(),
  users_id: z.string().uuid().optional(),
});


export type IssueInputSchema = z.infer<typeof IssueSchema>;
