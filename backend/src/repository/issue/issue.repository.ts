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
  getAllIssues: async ({ limit, skip, issue_id }: any) => {
    try {
      
      return await prisma.issue.findMany({
        ...(issue_id && issue_id !== "undefined" && { issue_id }),
        skip: skip,
        take: limit,
        orderBy: { created_at: "desc" },
      });
    } catch (error) {
      console.error("Error retrieving issues:", error);
      throw error;
    }
  },
};
