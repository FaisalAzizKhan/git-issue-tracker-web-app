import Elysia from "elysia";
import { AuthController } from "../../controller/auth/auth.controller.ts";
import { IssueCommentController } from "../../controller/issue/issue.comment.controller.ts";
import { verifyToken } from "../../utilities/token/token.utilities.ts";

const IssueCommentRoutes = new Elysia();

IssueCommentRoutes.use(verifyToken);
IssueCommentRoutes.group("/issue-comment", (group: any) => {
  group.post("/create-new-comment", IssueCommentController.createIssueComment);
  group.get("/get-all-by-issue-id", IssueCommentController.getAllIssuesByIssueId);

  return group;
});


export default IssueCommentRoutes;