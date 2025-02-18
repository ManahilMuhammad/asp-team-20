const jwt = require("jsonwebtoken");
const db = require("../models");
const config = require("../config/config.json");
const { NODE_ENV } = require("../config/config");

// Determine the environment (default to development)
const jwtSecret = config[NODE_ENV].jwtSecret;

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, jwtSecret); // Use jwtSecret from config.json
      req.user = await db.User.findByPk(decoded.id);
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
