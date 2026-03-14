import { Prisma } from "@prisma/client";
import { any, ZodError } from "zod";

export function handleError(
  statusCode: number = 500,
  payload: HandleErrorPayload = {}
) {
  const { message = "Something went wrong", error } = payload;

  if (error instanceof ZodError) {
    return {
      status: 400,
      body: {
        message: "Validation failed",
        errors: error.flatten(),
      },
    };
  }

  // Check for Prisma errors first
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      status: 400,
      body: {
        message: "Database error",
        code: error.code,
        meta: error.meta,
        error: error.message,
      },
    };
  }

  // Then generic Error
  if (error instanceof Error) {
    return {
      status: statusCode,
      body: {
        message,
        error: error.message,
      },
    };
  }

  // Fallback for unknown error types
  return {
    status: statusCode,
    body: {
      message,
      error: typeof error === "string" ? error : JSON.stringify(error),
    },
  };
}

export const handleElysiaError = (
  set: any,
  statusCode: number,
  payload: any,
  data?: any
) => {
  const { status, body }: any = handleError(statusCode, payload);
  set.status = status;
  try {
    console.error("Error:", body);
    return {
      message: body?.message,
      error: JSON.parse(body?.error),
      data,
    };
  } catch (error) {
    return body;
  }
};
