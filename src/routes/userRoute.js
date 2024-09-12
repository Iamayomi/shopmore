////////////////// USER ROUTES ////////////////////////////////////

const express = require("express");
const router = express.Router();

const userService = require("../services/userService");
const authorizationMiddleware = require("../middleware/authMiddleware"); // importing authMiddleware
const { User } = require("../models/index");

// authorization route
router.use(authorizationMiddleware(User));

// update user profile route
router.patch("/:userId/update-Myprofile", userService.changeUserDetails);

// update user profile route
router.get("/:userId/getUser-profile", userService.getUser);

// change user password route
router.post("/:userId/change-Password", userService.changePassword);

// delete user account
router.patch("/:userId/delete-MyAccount", userService.deleteMe);

module.exports = router;
