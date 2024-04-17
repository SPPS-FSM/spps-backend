const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Prodi = {
    getAllProdi: async () => {
        try {
            const prodis = await prisma.prodi.findMany();

            return prodis;
        } catch (error) {
            throw new Error("Failed to get all prodis");
        }
    },
};

module.exports = Prodi;
