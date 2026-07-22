/*
  Warnings:

  - Added the required column `name` to the `Interest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Interest` ADD COLUMN `name` VARCHAR(191) NOT NULL;
