const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const MasterJenisSurat = {
    // MAHASISWA START
    getAllJenisSurat: async () => {
        try {
            const surat = await prisma.master_Jenis_Surat.findMany({
                select: {
                    id_jenis_surat: true,
                    nama_jenis_surat: true
                }
            })

            return surat
        } catch (error) {
            throw new Error("Failed to get all jenis surat")
        }
    },

    getSpecifiedJenisSurat: async(id_jenis_surat) => {
        try {
            const surat = await prisma.master_Input_Surat.findUnique({
                where: {
                    id_jenis_surat: id_jenis_surat
                },
                select: {
                    Master_Input_Surat: {
                        select: {
                            code: true
                        }
                    }
                },
                include: {
                    Int_JenisSurat_Input: {
                        include: {
                            Master_Input_Surat: true
                        }
                    }
                },
                orderBy: {
                    'Master_Input_Surat.urutan': 'asc'
                }
            })
            
            return surat
        } catch (error) {
            throw new Error("Failed to get specified surat")
        }
    }
    // MAHASISWA END
}

module.exports = MasterJenisSurat