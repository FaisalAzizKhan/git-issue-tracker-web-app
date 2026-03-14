import { PrismaClient, Prisma } from "@prisma/client";
import { create } from "node:domain";

const prisma = new PrismaClient();

export const IssueCommentRepository = {
  createIssueComment: async (data: any) => {
    try {
      return await prisma.issue_comment.create({
        data,
      });
    } catch (error) {
      console.error("Error creating issue comment:", error);
      throw error;
    }
  },
  getAllIssueComments: async ({ limit, skip, issue_id }: any) => {
    try {
      
      return await prisma.issue_comment.findMany({
        where: {
          ...(issue_id && issue_id !== "undefined" && { issue_id }),
        },
        skip: skip,
        take: limit,
        include: { users: { omit: { password: true } } },
        orderBy: { created_at: "desc" },
      });
    } catch (error) {
      console.error("Error retrieving issues comments:", error);
      throw error;
    }
  },
};
