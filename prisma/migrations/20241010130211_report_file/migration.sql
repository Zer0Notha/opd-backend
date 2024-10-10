/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ReportFile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReportFile_name_key" ON "ReportFile"("name");
