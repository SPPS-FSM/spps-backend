-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique_id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `id_role` INTEGER NOT NULL,
    `id_prodi` VARCHAR(191) NOT NULL,
    `id_bagian` INTEGER NULL,

    UNIQUE INDEX `User_unique_id_key`(`unique_id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id_role` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departemen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_departemen` VARCHAR(191) NOT NULL,
    `nama_departemen` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Departemen_id_departemen_key`(`id_departemen`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prodi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prodi` VARCHAR(191) NOT NULL,
    `nama_prodi` VARCHAR(191) NOT NULL,
    `id_departemen` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Prodi_id_prodi_key`(`id_prodi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bagian` (
    `id_bagian` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_bagian` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_bagian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log_User` (
    `id_log_user` INTEGER NOT NULL AUTO_INCREMENT,
    `unique_id` VARCHAR(191) NOT NULL,
    `waktu` DATETIME(3) NOT NULL,
    `aksi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_log_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Surat` (
    `id_surat` INTEGER NOT NULL AUTO_INCREMENT,
    `no_surat` VARCHAR(191) NOT NULL,
    `tgl_surat` DATETIME(3) NOT NULL,
    `perihal` VARCHAR(191) NOT NULL,
    `id_jenis_surat` INTEGER NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_bagian` INTEGER NOT NULL,

    PRIMARY KEY (`id_surat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Master_Jenis_Surat` (
    `id_jenis_surat` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jenis_surat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_jenis_surat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log_Surat` (
    `id_log_surat` INTEGER NOT NULL AUTO_INCREMENT,
    `id_surat` INTEGER NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `waktu` DATETIME(3) NOT NULL,
    `catatan` VARCHAR(191) NULL,
    `id_status` INTEGER NOT NULL,

    PRIMARY KEY (`id_log_surat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Master_Status_Surat` (
    `id_status` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `Role`(`id_role`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_prodi_fkey` FOREIGN KEY (`id_prodi`) REFERENCES `Prodi`(`id_prodi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_bagian_fkey` FOREIGN KEY (`id_bagian`) REFERENCES `Bagian`(`id_bagian`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prodi` ADD CONSTRAINT `Prodi_id_departemen_fkey` FOREIGN KEY (`id_departemen`) REFERENCES `Departemen`(`id_departemen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log_User` ADD CONSTRAINT `Log_User_unique_id_fkey` FOREIGN KEY (`unique_id`) REFERENCES `User`(`unique_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Surat` ADD CONSTRAINT `Surat_id_jenis_surat_fkey` FOREIGN KEY (`id_jenis_surat`) REFERENCES `Master_Jenis_Surat`(`id_jenis_surat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Surat` ADD CONSTRAINT `Surat_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`unique_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log_Surat` ADD CONSTRAINT `Log_Surat_id_surat_fkey` FOREIGN KEY (`id_surat`) REFERENCES `Surat`(`id_surat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log_Surat` ADD CONSTRAINT `Log_Surat_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `Master_Status_Surat`(`id_status`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log_Surat` ADD CONSTRAINT `Log_Surat_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`unique_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
