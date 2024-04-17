/*
  Warnings:

  - You are about to drop the column `id_bagian` on the `Surat` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `User` table. All the data in the column will be lost.
  - Added the required column `id_bagian` to the `Master_Jenis_Surat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Surat` DROP FOREIGN KEY `Surat_id_bagian_fkey`;

-- AlterTable
ALTER TABLE `Master_Jenis_Surat` ADD COLUMN `id_bagian` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Surat` DROP COLUMN `id_bagian`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `Status`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Master_Jenis_Surat` ADD CONSTRAINT `Master_Jenis_Surat_id_bagian_fkey` FOREIGN KEY (`id_bagian`) REFERENCES `Bagian`(`id_bagian`) ON DELETE RESTRICT ON UPDATE CASCADE;
