const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - Missing Token" });
  }

  try {
    const decodedToken = jwt.verify(token.split(" ")[1], "your_secret_key");

    if (!decodedToken || !decodedToken.unique_id) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    req.unique_id = decodedToken.unique_id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized - Token expired" });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = auth;
