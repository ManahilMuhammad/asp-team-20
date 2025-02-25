const express = require("express");
const router = express.Router();
// Import an authentication middleware
const { protect } = require("../middleware/auth.middelware");


// Define the endpoint to validate JWT
router.get('/validate', protect);


module.exports = router;