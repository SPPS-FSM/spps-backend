-- DropForeignKey
ALTER TABLE `Master_Jenis_Surat` DROP FOREIGN KEY `Master_Jenis_Surat_id_bagian_fkey`;

-- CreateTable
CREATE TABLE `Master_Input_Surat` (
    `id_input_surat` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_input_surat` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_input_surat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Master_Alur_Surat` (
    `id_alur_surat` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_alur_surat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_alur_surat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Int_JenisSurat_Alur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_jenis_surat` INTEGER NOT NULL,
    `id_alur_surat` INTEGER NOT NULL,
    `urutan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Int_JenisSurat_Input` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_jenis_surat` INTEGER NOT NULL,
    `id_input_surat` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Int_JenisSurat_Alur` ADD CONSTRAINT `Int_JenisSurat_Alur_id_jenis_surat_fkey` FOREIGN KEY (`id_jenis_surat`) REFERENCES `Master_Jenis_Surat`(`id_jenis_surat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Int_JenisSurat_Alur` ADD CONSTRAINT `Int_JenisSurat_Alur_id_alur_surat_fkey` FOREIGN KEY (`id_alur_surat`) REFERENCES `Master_Alur_Surat`(`id_alur_surat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Int_JenisSurat_Input` ADD CONSTRAINT `Int_JenisSurat_Input_id_jenis_surat_fkey` FOREIGN KEY (`id_jenis_surat`) REFERENCES `Master_Jenis_Surat`(`id_jenis_surat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Int_JenisSurat_Input` ADD CONSTRAINT `Int_JenisSurat_Input_id_input_surat_fkey` FOREIGN KEY (`id_input_surat`) REFERENCES `Master_Input_Surat`(`id_input_surat`) ON DELETE RESTRICT ON UPDATE CASCADE;
