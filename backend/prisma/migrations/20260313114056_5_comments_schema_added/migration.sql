-- CreateTable
CREATE TABLE "issue_comment" (
    "issue_comment_id" UUID NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issue_id" UUID,
    "users_id" UUID,

    CONSTRAINT "issue_comment_pkey" PRIMARY KEY ("issue_comment_id")
);

-- AddForeignKey
ALTER TABLE "issue_comment" ADD CONSTRAINT "issue_comment_issue_id_fkey" FOREIGN KEY ("issue_id") REFERENCES "issue"("issue_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_comment" ADD CONSTRAINT "issue_comment_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("users_id") ON DELETE CASCADE ON UPDATE CASCADE;
