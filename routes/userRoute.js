const express = require('express');
const authService = require('../services/authService');
const userService = require('../services/userService');
const authenticate = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/register', authService.register);
router.post('/signin', authService.login);

// router.use(authService.getAllActiveUsers);
router.use(authenticate.protectRoute);

router.get('/getAllUser', userService.getAllUser);
router.post('/forgotPassword', authService.forgotPassword);
router.patch('/resetPassword/:token', authService.resetPassword);
router.delete('/deleteMyAccount', userService.deleteMe);

module.exports = router;
