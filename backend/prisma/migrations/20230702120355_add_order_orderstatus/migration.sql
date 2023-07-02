-- AlterTable
ALTER TABLE `Product` ADD COLUMN `orderId` VARCHAR(191) NULL DEFAULT '';

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('CREATED', 'PROCESSING', 'COMPLETED', 'CANCELLED') NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `customer` VARCHAR(191) NOT NULL,
    `paid` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
