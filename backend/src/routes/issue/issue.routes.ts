import Elysia from "elysia";
import { AuthController } from "../../controller/auth/auth.controller.ts";
import { IssueController } from "../../controller/issue/issue.controller.ts";
import { verifyToken } from "../../utilities/token/token.utilities..ts";

const IssueRoutes = new Elysia();

IssueRoutes.use(verifyToken)
IssueRoutes.group("/issue", (group: any) => {
  group.post("/create", IssueController.createIssue);
  group.get("/get-all", IssueController.getAllIssues);

  return group;
});


export default IssueRoutes;