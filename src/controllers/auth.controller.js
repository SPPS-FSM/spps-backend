const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const LogUser = require("../models/LogUser");
const auth = require("../middleware/auth");
const AuthController = {
  login: async (req, res) => {
    const { identifier, password } = req.body;

    try {
      let user;

      if (identifier.includes("@")) {
        user = await User.getUserByEmail(identifier);
      } else {
        user = await User.getUserByUniqueId(identifier);
      }

      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid credentials" });
      }

      if (user.status === "Tidak Aktif") {
        res.status(401).json({ error: "Akun ada berada di status tidak aktif, harap hubungi operator" });
      }

      const token = await jwt.sign(
        {
          unique_id: user.unique_id,
        },
        "your_secret_key",
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400,
        }
      );

      req.session.token = token;
      req.session.unique_id = user.unique_id;
      req.session.role = user.role;
      req.session.id_bagian = user.id_bagian;
      req.session.prodi = user.prodi;

      LogUser.login(user.unique_id);

      res.status(200).header("Authorization", `Bearer ${token}`).json({
        token: token,
        unique_id: user.unique_id,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", error: error.message });
    }
  },

  logout: async (req, res) => {
    const unique_id = req.session.unique_id;

    try {
      LogUser.logout(unique_id);
      req.session = null
      res.status(200).json({ message: "Logout success" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", error: error.message });
    }
  },
};

module.exports = AuthController;
