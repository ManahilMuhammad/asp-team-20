const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

// Determine the environment (default to development)
const env = process.env.NODE_ENV || "development";
const jwtSecret = config[env].jwtSecret;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "30d" });
};

module.exports = generateToken;
