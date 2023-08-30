/*
  Warnings:

  - A unique constraint covering the columns `[basketId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `basketId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Basket" DROP CONSTRAINT "Basket_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "basketId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_basketId_key" ON "User"("basketId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
