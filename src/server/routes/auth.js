const express = require("express");
const router = express.Router();
// Import an authentication middleware
const authController = require('../controllers/authController');


// Route to simply validate the JWT token
router.post('/validate', authController.validateTokenEndpoint);


module.exports = router;