/*
  Warnings:

  - You are about to drop the `_TeamOfProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TeamOfProject" DROP CONSTRAINT "_TeamOfProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamOfProject" DROP CONSTRAINT "_TeamOfProject_B_fkey";

-- DropTable
DROP TABLE "_TeamOfProject";

-- CreateTable
CREATE TABLE "UserProjects" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "projectId" UUID NOT NULL,

    CONSTRAINT "UserProjects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProjects" ADD CONSTRAINT "UserProjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProjects" ADD CONSTRAINT "UserProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
