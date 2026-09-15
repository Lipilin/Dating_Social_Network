/*
  Warnings:

  - Added the required column `icon` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Interest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Category` ADD COLUMN `icon` VARCHAR(191) NOT NULL,
    ADD COLUMN `isCountry` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Interest` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `age` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Page` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InterestToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_InterestToUser_AB_unique`(`A`, `B`),
    INDEX `_InterestToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_InterestToUser` ADD CONSTRAINT `_InterestToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Interest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InterestToUser` ADD CONSTRAINT `_InterestToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
