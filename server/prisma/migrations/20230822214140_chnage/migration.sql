/*
  Warnings:

  - You are about to drop the column `userId` on the `Basket` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Basket_userId_key";

-- AlterTable
ALTER TABLE "Basket" DROP COLUMN "userId";
