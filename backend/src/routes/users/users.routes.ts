import Elysia from "elysia";
import { verifyToken } from "../../utilities/token/token.utilities.ts";
import { UsersController } from "../../controller/users/users.controller.ts";

const UsersRoutes = new Elysia();

UsersRoutes.use(verifyToken);
UsersRoutes.group("/users-info", (group: any) => {
  group.get("/get-users-details", UsersController.getUsersDetails);

  return group;
});

export default UsersRoutes;
