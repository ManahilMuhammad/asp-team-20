const jwt = require("jsonwebtoken");
const db = require("../models/index");
const { JWT_SECRET } = require("../config/config");

// Determine the environment (default to development)
const jwtSecret = JWT_SECRET;

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, jwtSecret); // Use jwtSecret from config.json
        // Optionally, check if the user exists in the database using Sequelize
      req.user = await db.User.findByPk(decoded.id);
      if (!req.user) {
      return res.status(401).json({ valid: false, message: 'User not found.' });
    }
      // If verification passes, send back a valid response
    res.json({ valid: true });
      next();
    } catch (error) {
        // Token is invalid or expired
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
