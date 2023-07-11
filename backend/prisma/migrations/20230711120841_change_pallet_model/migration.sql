/*
  Warnings:

  - A unique constraint covering the columns `[locationId]` on the table `Pallet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Pallet` ADD COLUMN `locationId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Pallet_locationId_key` ON `Pallet`(`locationId`);
