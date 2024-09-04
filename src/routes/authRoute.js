// authentication routes

const express = require('express'); // import express
const authenticationService = require('../services/authService'); // importing authenticationService
const authorizationMiddleware = require('../middleware/authMiddleware'); // importing authMiddleware
const { User } = require("../models/index");

// calling express router
const router = express.Router();


// send otp to user
// router.post("/send-opt/:userId", authenticationService.generateOneTimePassword);

// sign up user route
router.post('/register', authenticationService.register);

// sign in user route
router.post('/signin', authenticationService.login);

// user verify phone number route
router.post("/:userId/verify-phone", authenticationService.verifyPhone);

// authorization route
router.use(authorizationMiddleware(User));

// user verify email
router.post("/:userId/verify-email", authenticationService.verifyEmail);

// user forget password route
router.post('/forgot-Password', authenticationService.forgotPassword);

// user reset password route
router.patch('/reset-Password', authenticationService.resetPassword);

// user logout
router.patch('/logout', authenticationService.userLogout);


// exporting the route
module.exports = router;