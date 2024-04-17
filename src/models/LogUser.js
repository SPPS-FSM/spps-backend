const { PrismaClient, Prisma } = require("@prisma/client")
const prisma = new PrismaClient()

const LogUser = {
    login: async (unique_id) => {
        try {
            const login = await prisma.log_User.create({
                data: {
                    unique_id: unique_id,
                    waktu: new Date(),
                    aksi: "Login"
                }
            })

            return login
        } catch (error) {
            throw new Error("Failed to login")
        }
    },

    logout: async (unique_id) => {
        try {
            const logout = await prisma.log_User.create({
                data: {
                    unique_id: unique_id,
                    waktu: new Date(),
                    aksi: "Logout"
                }
            })

            return logout
        } catch (error) {
            throw new Error("Failed to logout")
        }
    }
}

module.exports = LogUser