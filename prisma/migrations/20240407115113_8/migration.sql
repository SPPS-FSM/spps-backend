/*
  Warnings:

  - You are about to drop the column `id_user` on the `Inv_Surat` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Log_Surat` table. All the data in the column will be lost.
  - Added the required column `nama_pengaju` to the `Inv_Surat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nim` to the `Inv_Surat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Inv_Surat` DROP FOREIGN KEY `Inv_Surat_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `Log_Surat` DROP FOREIGN KEY `Log_Surat_id_user_fkey`;

-- AlterTable
ALTER TABLE `Inv_Surat` DROP COLUMN `id_user`,
    ADD COLUMN `nama_pengaju` VARCHAR(191) NOT NULL,
    ADD COLUMN `nim` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Log_Surat` DROP COLUMN `id_user`;
