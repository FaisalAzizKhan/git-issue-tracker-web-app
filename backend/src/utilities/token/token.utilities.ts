// src/utilities/token/token.ts
// middlewares/verifyToken.ts
import { Elysia } from "elysia";
import jwt from "jsonwebtoken";
import { handleElysiaError } from "../error/error.utilities";

export const verifyToken = (app: any) =>
  app.derive(async ({ set, error, body, request: { headers, url } }: any) => {
    const authorization = headers.get("authorization");

    if (!Bun.env.JWT_SECRET_KEY) throw error(500, "ENV is missing");

    if (!authorization) throw error(401, "Authorization header is missing");

    const token = authorization.split(" ")[1];

    if (!token) throw error(401, "Token is missing");

    try {
      const decoded: any = jwt.verify(token, Bun.env.JWT_SECRET_KEY);

      if (!decoded) return handleElysiaError(set, 401, "Invalid Token");
      else
        return {
          loggedin_user_id: decoded.loggedin_user_id,
          loggedin_user_name: decoded.loggedin_user_name,
          loggedin_user_role: decoded.loggedin_user_role,
        };
    } catch (err: any) {
      throw handleElysiaError(set, 401, err.message || "Unauthorized");
    }
  });

export const createToken = async (
  user_id: string,
  user_role: string,
  expireTime: string = "36h"
): Promise<string> => {
  const payload = {
    loggedin_user_id: user_id,
    loggedin_user_role: user_role,
  };
  const secret = Bun.env.JWT_SECRET_KEY!;
  // const options = { expiresIn: expireTime as jwt.SignOptions | any };
  const token = await jwt.sign(payload, secret);

  return token;
};
