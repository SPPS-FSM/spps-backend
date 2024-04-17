const Inv_Surat = require('../models/Inv_Surat')
const LogSurat = require('../models/LogSurat')
const jwt = require('jsonwebtoken')
const MasterTemplateSurat = require('../models/MasterTemplateSurat')

const MahasiswaController = {
    getAllSurat: async (req, res) => {
        try {
            const surat = await Inv_Surat.getAllSurat()

            if (surat) {
                res.status(200).json(surat)
            } else {
                res.status(500).json({ error: "Failed to get all surat" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    getSpecifiedSurat: async (req, res) => {
        const id_surat = req.params.id_surat

        try {
            const surat = await Inv_Surat.getSpecifiedSurat(id_surat)

            if (surat) {
                res.status(200).json(surat)
            } else {
                res.status(500).json({ error: "Failed to get specified surat" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    // uploadSurat: async (req, res) => {
    //     const unique_id = req.headers.unique_id

    //     const { no_surat,  perihal } = req.body

    //     const { id_jenis_surat, id_bagian } = req.params

    //     try {

    //         if (!no_surat || !tgl_surat || !perihal || !id_jenis_surat || !id_bagian) {
    //             return res.status(400).json({ error: "Invalid payload" })
    //         }

    //         const surat = await Inv_Surat.uploadSurat(no_surat, perihal, id_jenis_surat, unique_id, id_bagian)

    //         if (surat) {
    //             res.status(200).json(surat)
    //         } else {
    //             res.status(500).json({ error: "Failed to upload surat" })
    //         }
    //     } catch (error) {
    //         res.status(500).json({ error: error.message })
    //     }
    // },

    cancelSurat: async (req, res) => {
        const id_surat = req.params.id_surat
        const id_user = req.headers.unique_id

        try {
            if(!id_surat) {
                return res.status(400).json({ error: "Invalid payload" })
            }

            const surat = await Inv_Surat.cancelSurat(id_surat, id_user)

            if (surat) {
                res.status(200).json(surat)
            } else {
                res.status(500).json({ error: "Failed to cancel surat" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    seeLogFromId: async (req, res) => {
        const id_surat = req.params.id_surat
        const unique_id = await jwt.decode(req.headers.authorization.split(" ")[1]).userId

        try {
            const logSurat = await Inv_Surat.mhsSeeLogFromId(id_surat, unique_id)

            if (logSurat) {
                res.status(200).json(logSurat)
            } else {
                res.status(500).json({ error: "Failed to get log surat" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    submittedSurat: async (req, res) => {
        const unique_id = await jwt.decode(req.headers.authorization.split(" ")[1]).userId

        try {
            const surat = await Inv_Surat.mhsSubmittedSurat(unique_id)

            if (surat) {
                res.status(200).json(surat)
            } else {
                res.status(500).json({ error: "Failed to get submitted surat" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    getTemplateSuratByUniqueId: async (req, res) => {
        const id_jenis_surat = req.params.id_jenis_surat

        try {
            const surat = await MasterTemplateSurat.getSpecifiedJenisSurat(id_jenis_surat)

            res.status(200).json(surat)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
}

module.exports = MahasiswaController