const express = require('express');
const userService = require('../services/userService');
// const authorizationMiddleware = require('../middleware/authMiddleware'); // importing authMiddleware
// const { User, UserTemp } = require("../models/index");



const router = express.Router();

// router.use(authService.getAllActiveUsers);
// router.use(authorizationMiddleware.protectRoute(UserTemp));

// router.get('/getAllUser', userService.getAllUser);
// router.patch('/addUserDetails', userService.changeUserDetails);

router.patch('/change-Password', userService.changePassword);
router.patch('/delete-MyAccount', userService.deleteMe);
// router.patch('/updateMyAccount', userService.updateMe);


module.exports = router;
