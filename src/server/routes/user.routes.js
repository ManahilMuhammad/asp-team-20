const express = require("express");
const { registerUser, loginUser, getUsers } = require("../controllers/userController");
const { NODE_ENV } = require("../config/config");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
if (NODE_ENV === 'development') router.get("/", getUsers);

module.exports = router;
