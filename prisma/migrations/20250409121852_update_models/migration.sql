/*
  Warnings:

  - A unique constraint covering the columns `[userId,assignmentId]` on the table `AssignmentSubmission` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ActivityLog" ADD COLUMN "entityId" TEXT;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN "coverImage" TEXT;

-- AlterTable
ALTER TABLE "Material" ADD COLUMN "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentSubmission_userId_assignmentId_key" ON "AssignmentSubmission"("userId", "assignmentId");
