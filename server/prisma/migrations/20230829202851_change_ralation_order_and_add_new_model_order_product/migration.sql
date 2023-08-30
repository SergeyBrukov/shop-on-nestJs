/*
  Warnings:

  - You are about to drop the column `ordersId` on the `BasketProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BasketProduct" DROP CONSTRAINT "BasketProduct_ordersId_fkey";

-- AlterTable
ALTER TABLE "BasketProduct" DROP COLUMN "ordersId";

-- CreateTable
CREATE TABLE "OrderProduct" (
    "id" SERIAL NOT NULL,
    "ordersId" INTEGER,
    "productId" INTEGER,
    "count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
