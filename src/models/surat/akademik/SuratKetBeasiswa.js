const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const SuratKetBeasiswa = {
    // MAHASISWA START
    applySurat: async (req) => {
        const { nama, unique_id } = req.session

        try {
            const apply = await prisma.surat.create({
                where: {
                    jenis_surat: {
                        id_jenis_surat: 1
                    },
                    data: {
                        nama: nama
                    }
                }
            })
        } catch (error) {
            throw new Error("Failed to apply surat")
        }
    }
}