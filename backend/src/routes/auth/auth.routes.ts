import Elysia from "elysia";
import { AuthController } from "../../controller/auth/auth.controller.ts";

const AuthRoutes = new Elysia()

AuthRoutes.group("/auth", (group: any) => {
    group.post("/login", AuthController.login)
    group.post("/sign-up", AuthController.signup)

    return group

}
)


export default AuthRoutes;