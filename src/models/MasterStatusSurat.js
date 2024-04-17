const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const MasterStatusSurat = {
    getAllStatusSurat: async () => {
        try {
            const statusSurat = await prisma.master_Status_Surat.findMany()
            
            return statusSurat
        } catch (error) {
            throw new Error("Error getting all status surat")
        }
    }
}

module.exports = MasterStatusSurat