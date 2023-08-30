/*
  Warnings:

  - You are about to drop the column `ordersId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_ordersId_fkey";

-- AlterTable
ALTER TABLE "BasketProduct" ADD COLUMN     "ordersId" INTEGER;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "ordersId";

-- AddForeignKey
ALTER TABLE "BasketProduct" ADD CONSTRAINT "BasketProduct_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
