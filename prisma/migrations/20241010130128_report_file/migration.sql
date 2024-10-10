/*
  Warnings:

  - You are about to drop the column `attachedFile` on the `ProjectReports` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectReports" DROP COLUMN "attachedFile";

-- CreateTable
CREATE TABLE "ReportFile" (
    "id" UUID NOT NULL,
    "reportId" UUID NOT NULL,

    CONSTRAINT "ReportFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReportFile_reportId_key" ON "ReportFile"("reportId");

-- AddForeignKey
ALTER TABLE "ReportFile" ADD CONSTRAINT "ReportFile_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ProjectReports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
