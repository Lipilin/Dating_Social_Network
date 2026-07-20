-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NULL,
    `description` VARCHAR(255) NULL,
    `status` ENUM('NEW', 'PENDING_APPROVEMENT', 'REGISTERED', 'BANNED') NOT NULL DEFAULT 'NEW',
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `avatar` VARCHAR(191) NULL,
    `banner` VARCHAR(191) NULL,
    `lastSeen` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `metadata` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `tags` JSON NULL,
    `content` TEXT NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING_APPROVEMENT', 'PUBLISHED', 'BANNED') NOT NULL DEFAULT 'PENDING_APPROVEMENT',
    `user_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcement` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `date_from` DATETIME(3) NOT NULL,
    `date_to` DATETIME(3) NOT NULL,
    `status` ENUM('PENDING_APPROVEMENT', 'PUBLISHED', 'BANNED') NOT NULL DEFAULT 'PENDING_APPROVEMENT',
    `departure` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `genderInterest` ENUM('MALE', 'FEMALE', 'ANYBODY') NOT NULL DEFAULT 'ANYBODY',
    `user_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interest` (
    `id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AnnouncementToInterest` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AnnouncementToInterest_AB_unique`(`A`, `B`),
    INDEX `_AnnouncementToInterest_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interest` ADD CONSTRAINT `Interest_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnnouncementToInterest` ADD CONSTRAINT `_AnnouncementToInterest_A_fkey` FOREIGN KEY (`A`) REFERENCES `Announcement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnnouncementToInterest` ADD CONSTRAINT `_AnnouncementToInterest_B_fkey` FOREIGN KEY (`B`) REFERENCES `Interest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
