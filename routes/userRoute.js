const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');


const router = express.Router({mergeParams: true});

router.post('/register', authController.register);


router.use(authController.protect);

router.get('/getAllUser', userController.getAllUser);

router.post('/signin', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.delete('/deleteMyAccount', userController.deleteMe);

module.exports = router;