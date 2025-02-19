const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

// Determine the environment (default to development)
const jwtSecret = JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "30d" });
};

module.exports = generateToken;
