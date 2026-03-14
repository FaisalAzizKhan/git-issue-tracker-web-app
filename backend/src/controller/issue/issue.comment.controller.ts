import { IssueCommentRepository } from "../../repository/issue/issue.comment.repository.ts";
import { IssueCommentSchema, type IssueCommentInputSchema } from "../../schema/issue/issue.comment.schema.ts";
import { handleElysiaError } from "../../utilities/error/error.utilities";


export const IssueCommentController = {
  createIssueComment: async ({
    body,
    error,
    set,
    jwt,
    loggedin_user_id,
  }: any) => {
    try {
      const parsed = IssueCommentSchema.safeParse(body);

      if (!parsed.success)
        return handleElysiaError(set, 400, {
          error: parsed.error.flatten(),
        });

      const { issue_id, comment }: IssueCommentInputSchema = parsed.data;

      const new_issue_comment = await IssueCommentRepository.createIssueComment(
        {
          issue_id,
          comment,
          users_id: loggedin_user_id,
        }
      );

      return {
        message: "Issue comment created successfully",
        data: new_issue_comment,
      };
    } catch (err) {
      console.error("Error creating issue comment:", err);

      return handleElysiaError(set, 500, {
        message: "An error occurred while creating issue comment",
      });
    }
  },
  getAllIssuesByIssueId: async ({ query, error, set, params }: any) => {
    try {
      const limit: number = Number(query?.page_size || params?.page_size) || 10;
      const offset: number = Number(query?.page_no || params?.page_no) || 1;
      const skip: number = (offset - 1) * limit;
      const issue_id: string = String(query?.issue_id || params?.issue_id);

      const issue_comments = await IssueCommentRepository.getAllIssueComments({
        limit,
        skip,
        issue_id,
      });

      return {
        message: "Issue comments retrieved successfully",
        data: issue_comments,
      };
    } catch (err) {
      console.error("Error retrieving issue comments:", err);

      return handleElysiaError(set, 500, {
        message: "An error occurred while retrieving issue comments",
      });
    }
  },
};