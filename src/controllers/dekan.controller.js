const Surat = require("../models/Surat")
const LogSurat = require("../models/LogSurat")
const DekanController = {
    getSuratFromBagian: async (req, res) => {
        const id_bagian = req.params.id_bagian

        try {
            const surat = await Surat.getSuratFromBagian(id_bagian)

            if (surat) {
                res.status(200).json(surat)
            } else {
                res.status(500).json({ error: "Failed to get surat from bagian" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    getSpecifedSurat: async(req, res) => {
        const id_surat = req.params.id_surat

        try {
            const surat = await Surat.getSpecifiedSurat(id_surat)

            if (surat) {
                res.status(200).json(surat)
            } else {
                res.status(500).json({ error: "Failed to get specified surat" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    signSurat: async (req, res) => {
        const id_surat = req.params.id_surat
        const id_user = req.headers.authorization.split(" ")[1].userId
        const id_bagian = id_user

        try {
            const logSurat = await LogSurat.signSurat(id_surat, id_user, id_bagian)

            if (logSurat) {
                res.status(200).json(logSurat)
            } else {
                res.status(500).json({ error: "Failed to sign surat" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
};
