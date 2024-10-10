/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `ReportFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `ReportFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReportFile" ADD COLUMN     "path" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReportFile_path_key" ON "ReportFile"("path");
