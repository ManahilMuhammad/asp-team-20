// This middleware only verifies user token using validateJWT utility
const db = require("../models/index");
const validateToken = require('../utils/validateJWT');


const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const decoded = validateToken(token); // Use jwtSecret from ../utils/validateJWT'
        // Checks if the user exists in the database using Sequelize
      req.user = await db.User.findByPk(decoded.id);
      if (!req.user) {
      return res.status(401).json({ valid: false, message: 'User not found.' });
    }
      // Token is valid, proceed to the next middleware/route handler
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
