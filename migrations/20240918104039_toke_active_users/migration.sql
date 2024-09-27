-- AlterTable
ALTER TABLE `user` ADD COLUMN `activationToken` VARCHAR(191) NULL,
    ADD COLUMN `isActivated` BOOLEAN NOT NULL DEFAULT false;
