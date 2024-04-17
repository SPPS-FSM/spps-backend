const User = require("../models/User");
const Inv_Surat = require("../models/Inv_Surat");
const LogSurat = require("../models/LogSurat");
const MasterJenisSurat = require("../models/MasterJenisSurat");

const AdminController = {
  //        UNTUK USER START
  getAll: async (req, res) => {
    try {
      const users = await User.getAll();
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(500).json({ error: "Failed to get users" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByRole: async (req, res) => {
    const id_role = req.params.id_role;

    try {
      const users = await User.getUserByRole(id_role);

      if (users) {
        res.status(200).json(users);
      } else {
        res.status(500).json({ error: "Failed to get users by role" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  getUserByUniqueId: async (req, res) => {
    const unique_id = req.body.unique_id;

    try {
      const users = await User.getUserByUniqueId(unique_id);

      if (users) {
        res.status(200).json(users);
      } else {
        res.status(500).json({ error: "Failed to get users by unique id" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserByEmail: async (req, res) => {
    const email = req.body.email;

    try {
      const user = await User.getUserByEmail(email);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(500).json({ error: "Failed to get user by email" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    const { unique_id, nama, password, email, id_role, id_prodi, id_bagian } = req.body;
    try {
      const user = await User.createUser(unique_id, nama, password, email, id_role, id_prodi, id_bagian);

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const unique_id = req.params.unique_id;

    try {
      const user = await UserModel.deleteUser(unique_id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deactiveUser: async (req, res) => {
    const unique_id = req.params.unique_id;

    try {
      const user = await UserModel.deactiveUser(unique_id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  //        UNTUK USER END

  //        UNTUK SURAT START
  getAllSurat: async (req, res) => {
    try {
      const surat = await Inv_Surat.getAllSurat();

      if (surat) {
        res.status(200).json(surat);
      } else {
        res.status(500).json({ error: "Failed to get all surat" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSpecifiedSurat: async (req, res) => {
    const id_surat = req.params.id_surat;

    try {
      const surat = await Inv_Surat.getSpecifiedSurat(id_surat);

      if (surat) {
        res.status(200).json(surat);
      } else {
        res.status(500).json({ error: "Failed to get specified surat" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getLogFromSpecifiedSurat: async (req, res) => {
    const id_surat = req.params.id_surat;

    try {
      const logSurat = await LogSurat.getLogFromSpecifiedSurat(id_surat);

      if (logSurat) {
        res.status(200).json(logSurat);
      } else {
        res.status(500).json({ error: "Failed to get log surat" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  uploadSurat: async (req, res) => {
    const { nama_jenis_surat, filename } = req.body;

    try {
      const surat = await MasterJenisSurat.uploadJenisSurat(nama_jenis_surat, filename);

      res.status(201).json(surat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteJenisSurat: async (req, res) => {
    const id_jenis_surat = req.params.id_jenis_surat;

    try {
      const surat = await MasterJenisSurat.deleteJenisSurat(id_jenis_surat);

      res.status(200).json(surat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateJenisSurat: async (req, res) => {
    const id_jenis_surat = req.params.id_jenis_surat;
    const filename = req.body.filename;

    try {
      const surat = await MasterJenisSurat.updateJenisSurat(id_jenis_surat, filename);

      res.status(200).json(surat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  //        UNTUK SURAT END
};

module.exports = AdminController;
