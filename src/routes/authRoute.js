////////////////// AUTHENTICATION ROUTES ////////////////////////////////////

const express = require("express"); // import express
const authenticationService = require("../services/authService"); // importing authenticationService
const authorizationMiddleware = require("../middleware/authMiddleware"); // importing authMiddleware
const { User } = require("../models/index");
const { authenticateApikey } = require("../middleware/authApikeyMiddleware");



// calling express router
const router = express.Router();


// api key middleware
router.use(authenticateApikey);

// sign up user route
router.post("/register", authenticationService.register);

// sign in user route
router.post("/signin", authenticationService.login);

// send otp user phone number route
router.post(
  "/:userId/send-otp-phonenumber",
  authenticationService.sendOTPPhonenumber
);

// user verify phone number route
router.post("/:userId/verify-phone", authenticationService.verifyPhone);

// user verify email
router.post("/:userId/verify-email", authenticationService.verifyEmail);

// authorization route
router.use(authorizationMiddleware(User));

// user forget password route
router.post("/forgot-password", authenticationService.forgotPassword);

// user routes for verify security code for password reset
router.post(
  "/verify-password-reset-code",
  authenticationService.verifyResetPasswordCode
);

router.patch(
  "/add-user-details",
  authenticationService.addDetails
);

// user reset password route
router.patch("/reset-password", authenticationService.resetPassword);

// user logout
router.patch("/logout", authenticationService.userLogout);

// exporting the route
module.exports = router;
