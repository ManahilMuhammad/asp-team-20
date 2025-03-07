// This is a dedicated endpoint validation controller that simply validates token  (e.g., for client-side verification on app reload),
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const { User } = require('../models');

module.exports.validateTokenEndpoint = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Fetch the user data to return it to the client to guarantee proper sync of data between devices
    const user = await User.findByPk(decodedToken.id);

    // No found user, then the token was manipulated OR account was terminated/deleted
    if (!user) return res.status(401).json({ valid: false, message: "Unauthorized" });

    res.json({ 
      valid: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      }
    });
  } catch (error) {
    // Handle errors differently if token is expired or invalid
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ valid: false, message: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ valid: false, message: "Unauthorized" });
    }

    console.error('unable to validate token', error);
    res.status(500).json({ valid: false, message: "An error occured" });
  }
};
