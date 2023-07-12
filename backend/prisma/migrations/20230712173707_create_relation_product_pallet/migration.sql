-- CreateTable
CREATE TABLE `PalletProduct` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `palletId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PalletProduct_productId_palletId_key`(`productId`, `palletId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PalletProduct` ADD CONSTRAINT `PalletProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PalletProduct` ADD CONSTRAINT `PalletProduct_palletId_fkey` FOREIGN KEY (`palletId`) REFERENCES `Pallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
