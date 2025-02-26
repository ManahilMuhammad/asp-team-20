// This is a dedicated endpoint validation controller that simply validates token  (e.g., for client-side verification on app reload),
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

module.exports.validateTokenEndpoint = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, JWT_SECRET);
    res.json({ valid: true });
  } catch (error) {
    res.status(401).json({ valid: false, message: "Invalid or expired token" });
  }
};
