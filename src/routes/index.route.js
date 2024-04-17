const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.route')
const adminRoutes = require('./admin.route')
const logSuratRoutes = require('./log_surat.route')
const jenisSuratRoutes = require('./jenis_surat.route')

router.use('/auth', authRoutes)
router.use('/admin', adminRoutes)
router.use('/log-surat', logSuratRoutes)
router.use('/jenis-surat', jenisSuratRoutes)

module.exports = router