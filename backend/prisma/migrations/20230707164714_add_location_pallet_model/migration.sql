-- CreateTable
CREATE TABLE `Location` (
    `id` VARCHAR(191) NOT NULL,
    `palletId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Location_palletId_key`(`palletId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pallet` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_palletId_fkey` FOREIGN KEY (`palletId`) REFERENCES `Pallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
