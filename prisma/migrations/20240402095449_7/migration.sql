/*
  Warnings:

  - You are about to drop the `Master_Jenis_Surat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Int_JenisSurat_Input` DROP FOREIGN KEY `Int_JenisSurat_Input_id_jenis_surat_fkey`;

-- DropForeignKey
ALTER TABLE `Inv_Surat` DROP FOREIGN KEY `Inv_Surat_id_jenis_surat_fkey`;

-- DropTable
DROP TABLE `Master_Jenis_Surat`;

-- CreateTable
CREATE TABLE `Master_Template_Surat` (
    `id_jenis_surat` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_template_surat` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `id_bagian` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_jenis_surat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inv_Surat` ADD CONSTRAINT `Inv_Surat_id_jenis_surat_fkey` FOREIGN KEY (`id_jenis_surat`) REFERENCES `Master_Template_Surat`(`id_jenis_surat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Int_JenisSurat_Input` ADD CONSTRAINT `Int_JenisSurat_Input_id_jenis_surat_fkey` FOREIGN KEY (`id_jenis_surat`) REFERENCES `Master_Template_Surat`(`id_jenis_surat`) ON DELETE RESTRICT ON UPDATE CASCADE;
