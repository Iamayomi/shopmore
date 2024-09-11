////////////////// USER ROUTES ////////////////////////////////////

const express = require("express");
const router = express.Router();

const userService = require("../services/userService");
const authorizationMiddleware = require("../middleware/authMiddleware"); // importing authMiddleware
const { User } = require("../models/index");

// authorization route
router.use(authorizationMiddleware(User));

// update user profile route
router.patch("/update-Myprofile", userService.changeUserDetails);

// update user profile route
router.get("/:userId/getUser-profile", userService.getUser);

// change user password route
router.post("/change-Password", userService.changePassword);

// delete user account
router.patch("/delete-MyAccount", userService.deleteMe);

module.exports = router;
