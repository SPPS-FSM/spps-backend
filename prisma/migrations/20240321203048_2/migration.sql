/*
  Warnings:

  - Added the required column `filename` to the `Master_Jenis_Surat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `Surat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_id_prodi_fkey`;

-- AlterTable
ALTER TABLE `Master_Jenis_Surat` ADD COLUMN `filename` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Surat` ADD COLUMN `filename` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `Status` VARCHAR(191) NOT NULL,
    MODIFY `id_prodi` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_prodi_fkey` FOREIGN KEY (`id_prodi`) REFERENCES `Prodi`(`id_prodi`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Surat` ADD CONSTRAINT `Surat_id_bagian_fkey` FOREIGN KEY (`id_bagian`) REFERENCES `Bagian`(`id_bagian`) ON DELETE RESTRICT ON UPDATE CASCADE;
