-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL DEFAULT 'Other',
    "level" TEXT NOT NULL DEFAULT 'BEGINNER',
    "estimatedHours" INTEGER NOT NULL DEFAULT 1,
    "sourceType" TEXT NOT NULL DEFAULT 'CUSTOM',
    "sourceUrl" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL DEFAULT 'admin',
    CONSTRAINT "Course_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("category", "createdAt", "creatorId", "description", "estimatedHours", "id", "level", "sourceType", "sourceUrl", "status", "title", "updatedAt") SELECT "category", "createdAt", "creatorId", "description", "estimatedHours", "id", "level", "sourceType", "sourceUrl", "status", "title", "updatedAt" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE INDEX "Course_category_idx" ON "Course"("category");
CREATE INDEX "Course_status_idx" ON "Course"("status");
CREATE INDEX "Course_creatorId_idx" ON "Course"("creatorId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
