/*
  Warnings:

  - You are about to drop the column `filename` on the `Master_Jenis_Surat` table. All the data in the column will be lost.
  - You are about to drop the `Int_JenisSurat_Alur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Master_Alur_Surat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Surat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `urutan` to the `Int_JenisSurat_Input` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Master_Jenis_Surat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Int_JenisSurat_Alur` DROP FOREIGN KEY `Int_JenisSurat_Alur_id_alur_surat_fkey`;

-- DropForeignKey
ALTER TABLE `Int_JenisSurat_Alur` DROP FOREIGN KEY `Int_JenisSurat_Alur_id_jenis_surat_fkey`;

-- DropForeignKey
ALTER TABLE `Log_Surat` DROP FOREIGN KEY `Log_Surat_id_surat_fkey`;

-- DropForeignKey
ALTER TABLE `Surat` DROP FOREIGN KEY `Surat_id_jenis_surat_fkey`;

-- DropForeignKey
ALTER TABLE `Surat` DROP FOREIGN KEY `Surat_id_user_fkey`;

-- AlterTable
ALTER TABLE `Int_JenisSurat_Input` ADD COLUMN `urutan` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Master_Jenis_Surat` DROP COLUMN `filename`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Int_JenisSurat_Alur`;

-- DropTable
DROP TABLE `Master_Alur_Surat`;

-- DropTable
DROP TABLE `Surat`;

-- CreateTable
CREATE TABLE `Inv_Surat` (
    `id_surat` INTEGER NOT NULL AUTO_INCREMENT,
    `no_surat` VARCHAR(191) NOT NULL,
    `tgl_surat` DATETIME(3) NOT NULL,
    `perihal` VARCHAR(191) NOT NULL,
    `id_jenis_surat` INTEGER NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_surat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inv_Surat` ADD CONSTRAINT `Inv_Surat_id_jenis_surat_fkey` FOREIGN KEY (`id_jenis_surat`) REFERENCES `Master_Jenis_Surat`(`id_jenis_surat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inv_Surat` ADD CONSTRAINT `Inv_Surat_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`unique_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log_Surat` ADD CONSTRAINT `Log_Surat_id_surat_fkey` FOREIGN KEY (`id_surat`) REFERENCES `Inv_Surat`(`id_surat`) ON DELETE RESTRICT ON UPDATE CASCADE;
