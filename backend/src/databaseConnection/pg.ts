// src/databaseConnection/pg.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Check the connection to the database
export const connectToPostgreSQL = async () => {
  try {
    await prisma.$connect();
  } catch (error: unknown | any) {
    throw new Error(
      error?.message ??
        JSON.stringify(error) ??
        "Error connecting to PostgreSQL"
    );
  }
};
