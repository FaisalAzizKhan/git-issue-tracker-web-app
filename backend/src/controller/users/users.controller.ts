import {
  AuthSchema,
  type AuthInputSchema,
} from "../../schema/auth/auth.schema.ts";
import {
  SignupSchema,
  type SignupInputSchema,
} from "../../schema/auth/signup.schema.ts";
import { handleElysiaError } from "../../utilities/error/error.utilities.ts";
import { UsersRepository } from "../../repository/users/users.repository.ts";
import { createToken } from "../../utilities/token/token.utilities.ts";

export const UsersController = {
  getUsersDetails: async ({ body, error, set, jwt, loggedin_user_id }: any) => {
    try {

      const users_details =
        await UsersRepository.getUserInformationById(loggedin_user_id);

      return {
        message: "Login successful",
        data: users_details,
      };
    } catch (err: any) {
      console.error("Login error:", err);
      return handleElysiaError(set, 500, {
        message: "An error occurred during login",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  },
};
