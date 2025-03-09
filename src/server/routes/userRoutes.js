const express = require("express");
const { registerUser, loginUser, getUsers, finalizeRegistration } = require("../controllers/userController");
const { NODE_ENV } = require("../config/config");

// Import an authentication middleware
const { protect } = require("../middleware/auth.middelware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/setup", protect, finalizeRegistration);
if (NODE_ENV === 'development') router.get("/", getUsers);

module.exports = router;
