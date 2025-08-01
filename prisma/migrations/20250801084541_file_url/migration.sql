/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `FlashcardSet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FlashcardSet" DROP COLUMN "fileUrl",
ADD COLUMN     "fileData" TEXT;
