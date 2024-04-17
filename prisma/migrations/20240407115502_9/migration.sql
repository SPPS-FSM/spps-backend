/*
  Warnings:

  - You are about to drop the column `nim` on the `Inv_Surat` table. All the data in the column will be lost.
  - Added the required column `nim_pengaju` to the `Inv_Surat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prodi_pengaju` to the `Inv_Surat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Inv_Surat` DROP COLUMN `nim`,
    ADD COLUMN `nim_pengaju` VARCHAR(191) NOT NULL,
    ADD COLUMN `prodi_pengaju` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Inv_Surat` ADD CONSTRAINT `Inv_Surat_prodi_pengaju_fkey` FOREIGN KEY (`prodi_pengaju`) REFERENCES `Prodi`(`id_prodi`) ON DELETE RESTRICT ON UPDATE CASCADE;
