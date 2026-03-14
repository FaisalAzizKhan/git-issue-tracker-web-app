/*
  Warnings:

  - You are about to drop the column `lebels` on the `issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "issue" DROP COLUMN "lebels",
ADD COLUMN     "labels" TEXT[];
