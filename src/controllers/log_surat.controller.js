const Inv_Surat = require("../models/Inv_Surat");
const LogSurat = require("../models/LogSurat");

const SuratController = {
  getAllSurat: async (req, res) => {
    try {
      const nama_pengaju = req.query.nama_pengaju;
      const id_jenis_surat = parseInt(req.query.id_jenis_surat);

      const surat = await LogSurat.getAllLog(nama_pengaju ? nama_pengaju : '', id_jenis_surat ? id_jenis_surat : null);
      res.status(200).json(surat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSuratById: async (req, res) => {
    const id_surat = parseInt(req.params.id_surat);

    try {
      const logSurat = await Inv_Surat.getSuratById(id_surat);

      res.status(200).json(logSurat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSpecifiedSurat: async (req, res) => {
    const id_surat = req.params.id_surat;

    try {
      const surat = await Inv_Surat.getSpecifiedSurat(id_surat);

      res.status(200).json(surat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = SuratController;
