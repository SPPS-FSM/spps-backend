const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const MasterJenisSurat = require("../models/MasterJenisSurat")

const JenisSuratController = {
    getAllJenisSurat: async (req, res) => {
        try {
            const jenis_surat = await MasterJenisSurat.getAllJenisSurat()
            res.status(200).json(jenis_surat)
        } catch (error) {
            res.status(500).message({ error: error.message })
        }
    }
}

module.exports = JenisSuratController