import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const UsersRepository = {
  getUsersByEmail: async (email: string) =>
    prisma.users
      .findUnique({
        where: {
          email: email,
        },
      })
      .catch((error: unknown | any) => {
        throw new Error(
          error?.message ?? JSON.stringify(error) ?? "Error Fetching Users"
        );
      }),
  getUserInformationById: async (users_id: string) =>
    prisma.users
      .findUnique({
        where: {
          users_id: users_id,
        },
        omit: { password: true },
        include: {issue: true, issue_assign_to: true, issue_comment: {include: {issue: true}}},
      })
      .catch((error: unknown | any) => {
        throw new Error(
          error?.message ?? JSON.stringify(error) ?? "Error Fetching Users"
        );
      }),

  createNew: async (user: Prisma.usersCreateInput) =>
    prisma.users
      .create({
        data: user,
      })
      .catch((error: unknown | any) => {
        throw new Error(
          error?.message ?? JSON.stringify(error) ?? "Error Creating User"
        );
      }),
  getAll: async (skip: number, limit: number, filters?: any) => {
    return prisma.users
      .findMany({
        skip: skip,
        take: limit,
        where: filters,
        omit: { password: true },
      })
      .catch((error: unknown | any) => {
        throw new Error(
          error?.message ?? JSON.stringify(error) ?? "Error Fetching Users"
        );
      });
  },
  updateUser: async (users_id: string, updates: Prisma.usersUpdateInput) =>
    prisma.users
      .update({
        where: {
          users_id: users_id,
        },
        data: updates,
      })
      .catch((error: unknown | any) => {
        throw new Error(
          error?.message ?? JSON.stringify(error) ?? "Error Updating User"
        );
      }),

  getAllExceptLoggedInUser: async ({ users_id }: { users_id: string }) => {
    return prisma.users
      .findMany({
        where: {
          users_id: {
            not: users_id,
          },
        },
        omit: { password: true },
      })
      .catch((error: unknown | any) => {
        throw new Error(
          error?.message ?? JSON.stringify(error) ?? "Error Fetching Users"
        );
      });
  },
};
