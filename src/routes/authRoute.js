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

// send otp user phone number route
router.post("/:userId/send-otp-phonenumber", authenticationService.sendOTPPhonenumber);

// user verify phone number route
router.post("/:userId/verify-phone", authenticationService.verifyPhone);

// user verify email
router.post("/:userId/verify-email", authenticationService.verifyEmail);

// user forget password route
router.post('/forgot-password', authenticationService.forgotPassword);

// user routes for verify security code for password reset
router.post('/verify-password-reset-code', authenticationService.verifyResetPasswordCode);

// user reset password route
router.patch('/reset-password', authenticationService.resetPassword);

// authorization route
router.use(authorizationMiddleware(User));

// user logout
router.patch('/logout', authenticationService.userLogout);


// exporting the route
module.exports = router;