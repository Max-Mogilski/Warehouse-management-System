-- DropForeignKey
ALTER TABLE `Location` DROP FOREIGN KEY `Location_palletId_fkey`;

-- AlterTable
ALTER TABLE `Location` MODIFY `palletId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_palletId_fkey` FOREIGN KEY (`palletId`) REFERENCES `Pallet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
