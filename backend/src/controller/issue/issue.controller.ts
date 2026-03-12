import { IssueRepository } from "../../repository/issue/issue.repository";
import { IssueSchema, type IssueInputSchema } from "../../schema/issue/issue.schema";
import { handleElysiaError } from "../../utilities/error/error.utilities";


export const IssueController = {
  createIssue: async ({ body, error, set, jwt, loggedin_user_id }: any) => {
    const parsed = IssueSchema.safeParse(body);

    if (!parsed.success)
      return handleElysiaError(set, 400, {
        error: parsed.error.flatten(),
      });

    const {
      title,
      variant,
      status,
      priority,
      description,
      labels,
    }: IssueInputSchema = parsed.data;

    // return console.log("Creating issue with data:", { loggedin_user_id, title, variant, status, priority, description, labels });

    const new_issue = await IssueRepository.createIssue({
      title,
      variant,
      status,
      priority,
      description,
      labels,
      users_id: loggedin_user_id,
    });

    return {
      message: "Issue created successfully",
      data: new_issue,
    };
  },
  getAllIssues: async ({ error, set, query, params }: any) => {
    try {
      const limit: number = Number(query?.page_size || params?.page_size) || 10;
      const offset: number = Number(query?.page_no || params?.page_no) || 1;
      const skip: number = (offset - 1) * limit;
      const issue_id: string = String(query?.issue_id || params?.issue_id)

      const issues = await IssueRepository.getAllIssues({
        limit,
        skip,
        issue_id,
      });

      return {
        message: "Issues retrieved successfully",
        data: issues,
      };
    } catch (error) {
      console.error("Error retrieving issues:", error);
      return handleElysiaError(set, 500, {
        message: "An error occurred while retrieving issues",
      });
    }
  },
};
