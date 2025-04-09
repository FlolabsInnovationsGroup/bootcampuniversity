/*
  Warnings:

  - You are about to drop the column `metadata` on the `ActivityLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Material" ADD COLUMN "duration" INTEGER;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ActivityLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "target" TEXT,
    "details" JSONB,
    "entityType" TEXT,
    "entityId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ActivityLog" ("action", "createdAt", "entityId", "entityType", "id", "target", "userId") SELECT "action", "createdAt", "entityId", "entityType", "id", "target", "userId" FROM "ActivityLog";
DROP TABLE "ActivityLog";
ALTER TABLE "new_ActivityLog" RENAME TO "ActivityLog";
CREATE INDEX "ActivityLog_userId_idx" ON "ActivityLog"("userId");
CREATE INDEX "ActivityLog_action_idx" ON "ActivityLog"("action");
CREATE INDEX "ActivityLog_entityType_idx" ON "ActivityLog"("entityType");
CREATE INDEX "ActivityLog_createdAt_idx" ON "ActivityLog"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
