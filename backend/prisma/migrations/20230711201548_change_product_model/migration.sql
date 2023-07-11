/*
  Warnings:

  - You are about to alter the column `quantityStock` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `quantityStock` DOUBLE NULL DEFAULT 0;
