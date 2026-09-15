/*
  Warnings:

  - The primary key for the `Announcement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Announcement` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `user_id` on the `Announcement` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - The primary key for the `Interest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Interest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `category_id` on the `Interest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - The primary key for the `Page` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `user_id` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `A` on the `_AnnouncementToInterest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `B` on the `_AnnouncementToInterest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `A` on the `_InterestToUser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `B` on the `_InterestToUser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - Added the required column `updatedAt` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `login` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Announcement` DROP FOREIGN KEY `Announcement_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Interest` DROP FOREIGN KEY `Interest_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `_AnnouncementToInterest` DROP FOREIGN KEY `_AnnouncementToInterest_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AnnouncementToInterest` DROP FOREIGN KEY `_AnnouncementToInterest_B_fkey`;

-- DropForeignKey
ALTER TABLE `_InterestToUser` DROP FOREIGN KEY `_InterestToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_InterestToUser` DROP FOREIGN KEY `_InterestToUser_B_fkey`;

-- AlterTable
ALTER TABLE `Announcement` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Category` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Interest` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `category_id` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Page` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Post` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    ADD COLUMN `login` VARCHAR(191) NOT NULL,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_AnnouncementToInterest` MODIFY `A` BIGINT NOT NULL,
    MODIFY `B` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `_InterestToUser` MODIFY `A` BIGINT NOT NULL,
    MODIFY `B` BIGINT NOT NULL;

-- CreateTable
CREATE TABLE `EmailMessage` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `from` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interest` ADD CONSTRAINT `Interest_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnnouncementToInterest` ADD CONSTRAINT `_AnnouncementToInterest_A_fkey` FOREIGN KEY (`A`) REFERENCES `Announcement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnnouncementToInterest` ADD CONSTRAINT `_AnnouncementToInterest_B_fkey` FOREIGN KEY (`B`) REFERENCES `Interest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InterestToUser` ADD CONSTRAINT `_InterestToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Interest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InterestToUser` ADD CONSTRAINT `_InterestToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
