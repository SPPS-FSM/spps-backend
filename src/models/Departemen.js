const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const Departemen = {
    getAllDepartemen: async () => {
        try {
            const departemens = await prisma.departemen.findMany()

            return departemens
        } catch (error) {
            throw new Error("Failed to get all departemens")
        }
    }
}

module.exports = Departemen