const express = require('express')
const router = express.Router()
const LogSuratController = require('../controllers/log_surat.controller')

router.get('/all', LogSuratController.getAllSurat)
router.get('/log/:id_surat', LogSuratController.getSuratById)

module.exports = router