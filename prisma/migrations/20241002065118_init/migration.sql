-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'teacher', 'admin', 'mentor');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('scientific', 'technical', 'service');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('not_confirmed', 'opened', 'closed', 'rejected');

-- CreateEnum
CREATE TYPE "ProjectRequestStatus" AS ENUM ('confirmed', 'rejected', 'working');

-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('bachelor', 'master', 'specialist', 'phd');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "vk" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "groupId" UUID NOT NULL,
    "role" "Role" NOT NULL,
    "profileGrades" TEXT[],
    "allowWatchMyGrades" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "maxUserNum" INTEGER NOT NULL,
    "problem" TEXT NOT NULL,
    "wayOfSolving" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL,
    "managerId" UUID NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectReports" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "authorId" UUID NOT NULL,
    "attachedFile" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "projectId" UUID NOT NULL,

    CONSTRAINT "ProjectReports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectRequest" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "priority" INTEGER NOT NULL,
    "status" "ProjectRequestStatus" NOT NULL,

    CONSTRAINT "ProjectRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" UUID NOT NULL,
    "enteringYear" TEXT NOT NULL,
    "foreign" BOOLEAN NOT NULL DEFAULT false,
    "type" "GroupType" NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MentorsOfProject" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_TeamOfProject" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_vk_key" ON "User"("vk");

-- CreateIndex
CREATE UNIQUE INDEX "_MentorsOfProject_AB_unique" ON "_MentorsOfProject"("A", "B");

-- CreateIndex
CREATE INDEX "_MentorsOfProject_B_index" ON "_MentorsOfProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamOfProject_AB_unique" ON "_TeamOfProject"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamOfProject_B_index" ON "_TeamOfProject"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectReports" ADD CONSTRAINT "ProjectReports_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectReports" ADD CONSTRAINT "ProjectReports_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRequest" ADD CONSTRAINT "ProjectRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRequest" ADD CONSTRAINT "ProjectRequest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorsOfProject" ADD CONSTRAINT "_MentorsOfProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorsOfProject" ADD CONSTRAINT "_MentorsOfProject_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamOfProject" ADD CONSTRAINT "_TeamOfProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamOfProject" ADD CONSTRAINT "_TeamOfProject_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
