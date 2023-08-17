/*
  Warnings:

  - You are about to drop the column `producerId` on the `Files` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filesId]` on the table `Producer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filesId` to the `Producer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_producerId_fkey";

-- AlterTable
ALTER TABLE "Files" DROP COLUMN "producerId";

-- AlterTable
ALTER TABLE "Producer" ADD COLUMN     "filesId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Producer_filesId_key" ON "Producer"("filesId");

-- AddForeignKey
ALTER TABLE "Producer" ADD CONSTRAINT "Producer_filesId_fkey" FOREIGN KEY ("filesId") REFERENCES "Files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
