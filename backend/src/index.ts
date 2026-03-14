import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { connectToPostgreSQL } from "./databaseConnection/pg.ts";
import getPrivateIP from "./utilities/printip/printip.utilities.ts";
import cors from "@elysiajs/cors";
import { logger } from "./utilities/logger/logger.utilities.ts";
import AuthRoutes from "./routes/auth/auth.routes.ts";
import IssueRoutes from "./routes/issue/issue.routes.ts";
import IssueCommentRoutes from "./routes/issue/issue.comment.routes.ts";
import UsersRoutes from "./routes/users/users.routes.ts";
 

const SERVER_PORT = Bun.env.SERVER_PORT || 5019;
const logInfo = {
  success: {
    message: "Connected to PostgreSQL database successfully",
    private_ip: getPrivateIP() || "No private IP found",
    env: Bun.env.NODE_ENV,
    host: Bun.env.PG_DB_HOST,
    port: Bun.env.PG_DB_PORT,
    user: Bun.env.PG_DB_USER,
    database: Bun.env.PG_DB_NAME,
  },
  error: {
    message: "Failed to connect to PostgreSQL database",
    private_ip: getPrivateIP() || "No private IP found",
    host: Bun.env.PG_DB_HOST,
    port: Bun.env.PG_DB_PORT,
    user: Bun.env.PG_DB_USER,
    database: Bun.env.PG_DB_NAME,
    bucket: Bun.env.S3_BUCKET,
  },
};
const baseRoute = async (app: Elysia) => {
  app.get("/", () => ({
    message: "Backend Server is Up and Running",
    version: "1.0.0",
    swagger: "http://localhost:" + SERVER_PORT + "/swagger",
  }));
};

const app = new Elysia();

if (Bun.env.NODE_ENV === "development" || Bun.env.NODE_ENV === "production")
  baseRoute(app);

app
  .use(swagger())
  .use(logger())
  .use(cors())
  .onError(({ code }) => code === "NOT_FOUND" && "Route not found :(")
  .use(AuthRoutes)
  .use(IssueRoutes)
  .use(UsersRoutes)
  .use(IssueCommentRoutes);


connectToPostgreSQL()
  .then(() => console.log(logInfo.success))
  .catch((error) => console.log(error, logInfo.error));

app.listen(SERVER_PORT, () =>
  console.log("Server is running on port " + SERVER_PORT)
);
