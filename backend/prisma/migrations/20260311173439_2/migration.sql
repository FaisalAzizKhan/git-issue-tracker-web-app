-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CLOSED', 'IN_PROGRESS', 'OPEN', 'REVIEW');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "issue" (
    "issue_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "variant" TEXT,
    "status" "Status" NOT NULL DEFAULT 'IN_PROGRESS',
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "assignee" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_opened" BOOLEAN NOT NULL DEFAULT true,
    "users_id" UUID,

    CONSTRAINT "issue_pkey" PRIMARY KEY ("issue_id")
);

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("users_id") ON DELETE CASCADE ON UPDATE CASCADE;
