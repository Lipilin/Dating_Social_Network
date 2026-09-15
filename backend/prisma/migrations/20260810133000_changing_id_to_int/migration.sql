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
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Category` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Interest` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `category_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Page` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Post` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_AnnouncementToInterest` MODIFY `A` INTEGER NOT NULL,
    MODIFY `B` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `_InterestToUser` MODIFY `A` INTEGER NOT NULL,
    MODIFY `B` INTEGER NOT NULL;

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
