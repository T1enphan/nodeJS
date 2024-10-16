/*
  Warnings:

  - Added the required column `deadline` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todo` ADD COLUMN `deadline` DATETIME(3) NOT NULL;
