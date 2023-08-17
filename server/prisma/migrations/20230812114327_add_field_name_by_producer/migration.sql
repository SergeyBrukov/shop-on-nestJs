/*
  Warnings:

  - Added the required column `name` to the `Producer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producer" ADD COLUMN     "name" TEXT NOT NULL;
