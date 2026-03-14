-- AlterTable
ALTER TABLE "issue" ADD COLUMN     "assign_to_id" UUID;

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_assign_to_id_fkey" FOREIGN KEY ("assign_to_id") REFERENCES "users"("users_id") ON DELETE CASCADE ON UPDATE CASCADE;
