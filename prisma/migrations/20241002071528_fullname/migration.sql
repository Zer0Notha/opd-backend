/*
  Warnings:

  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patronymic` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "patronymic" TEXT NOT NULL,
ADD COLUMN     "secondName" TEXT NOT NULL;
