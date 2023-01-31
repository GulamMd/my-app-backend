const express = require("express");
const router = express.Router();

// Load the auth controller
const authController = require("../controllers/auth");

// Define the authentication routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
