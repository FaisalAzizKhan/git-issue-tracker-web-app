import { PrismaClient, Prisma } from "@prisma/client";
import { create } from "node:domain";

const prisma = new PrismaClient();

export const IssueRepository = {
  createIssue: async (data: any) => {
    try {
      return await prisma.issue.create({
        data,
      });
    } catch (error) {
      console.error("Error creating issue:", error);
      throw error;
    }
  },
  getAllIssues: async ({ limit, skip, where }: any) => {
    try {
      return await prisma.issue.findMany({
        where: where,
        skip: skip,
        take: limit,
        include: { users: { omit: { password: true } } },
        orderBy: { created_at: "desc" },
      });
    } catch (error) {
      console.error("Error retrieving issues:", error);
      throw error;
    }
  },
};
