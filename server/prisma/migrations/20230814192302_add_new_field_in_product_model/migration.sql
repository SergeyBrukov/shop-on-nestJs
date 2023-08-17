-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "bestseller" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "new" BOOLEAN NOT NULL DEFAULT false;
