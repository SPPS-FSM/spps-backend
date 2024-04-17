const express = require("express")
const router = express.Router()
const JenisSuratController = require("../controllers/jenis_surat.controller")

router.get('/all', JenisSuratController.getAllJenisSurat)

module.exports = router