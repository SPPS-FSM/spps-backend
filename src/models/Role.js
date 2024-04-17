const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const Role = {
    getAllRole: async () => {
        try {
            const roles = await prisma.role.findMany()

            return roles
        } catch (error) {
            throw new Error("Failed to get all roles")
        }
    }
}

module.exports = Role