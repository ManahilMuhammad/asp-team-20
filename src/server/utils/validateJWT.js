// utils/validateJWT.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

function validateToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = validateToken;
