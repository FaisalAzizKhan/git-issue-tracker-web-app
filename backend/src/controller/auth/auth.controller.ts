import {
  AuthSchema,
  type AuthInputSchema,
} from "../../schema/auth/auth.schema.ts";
import {
  SignupSchema,
  type SignupInputSchema,
} from "../../schema/auth/signup.schema.ts";
import { handleElysiaError } from "../../utilities/error/error.utilities";
import { UsersRepository } from "../../repository/users/users.repository";
import { createToken } from "../../utilities/token/token.utilities.ts";

export const AuthController = {
  login: async ({ body, error, set, jwt }: any) => {

   try {
     console.log("Login request body:", body);

     const parsed = AuthSchema.safeParse(body);
     const expireTime = "30d";

     if (!parsed.success)
       return handleElysiaError(set, 400, { error: parsed.error.flatten() });

     const { email, password: users_password }: AuthInputSchema = parsed.data;

      

     const existing_users_by_email = await UsersRepository.getUsersByEmail(
       email
     );

     if (!existing_users_by_email)
       return handleElysiaError(set, 400, {
         message: "Invalid email or password",
       });



  

     const isPasswordValid = await Bun.password.verify(
       users_password as string,
       existing_users_by_email.password as string
     );

     if (!isPasswordValid)
       return handleElysiaError(set, 400, {
         message: "Invalid email or password",
       });

     const { password, ...usersWithoutPassword } = existing_users_by_email;

     const token = await createToken(
       existing_users_by_email?.users_id || "",
       "users",
       expireTime
     );

     return {
       message: "Login successful",
       data: { ...usersWithoutPassword, token },
     };
   } catch (err: any) {

      console.error("Login error:", err);
      return handleElysiaError(set, 500, {
        message: "An error occurred during login",
        error: err instanceof Error ? err.message : String(err),
      });
   }
  },

  signup: async ({ body, error, set, jwt }: any) => {
  try {
    
      const parsed = SignupSchema.safeParse(body);
      const expireTime = "30d";

      if (!parsed.success)
        return handleElysiaError(set, 400, { error: parsed.error.flatten() });

      const {
        email,
        password: users_password,
        first_name,
        last_name,
        phone,
      }: SignupInputSchema = parsed.data;

      const existing_users_by_email = await UsersRepository.getUsersByEmail(
        email
      );

      if (existing_users_by_email)
        return handleElysiaError(set, 400, {
          message: "User already exists",
        });

      const hashed_password = await Bun.password.hash(users_password);

      const users = await UsersRepository.createNew({
        email,
        password: hashed_password,
        first_name,
        last_name,
        phone,
      });

      const { password, ...usersWithoutPassword } = users || {};

      const token = await createToken(
        users?.users_id || "",
        "users",
        expireTime
      );

      return (
        (set.status = 201),
        {
          message: "User created successfully",
          data: usersWithoutPassword,
          token,
        }
      );

  } catch (err) {
      console.error("Signup error:", err);
      return handleElysiaError(set, 500, {
        message: "An error occurred during signup",
        error: err instanceof Error ? err.message : String(err),
      });

  }


  },
};
