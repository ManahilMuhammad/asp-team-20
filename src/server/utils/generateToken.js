const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const { NODE_ENV } = require("../config/config");

// Determine the environment (default to development)
const jwtSecret = config[NODE_ENV].jwtSecret;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "30d" });
};

module.exports = generateToken;
