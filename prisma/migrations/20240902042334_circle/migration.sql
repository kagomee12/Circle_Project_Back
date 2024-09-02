/*
  Warnings:

  - Made the column `content` on table `Posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "content" SET NOT NULL;
