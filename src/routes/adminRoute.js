const express = require("express");
const router = express.Router();

const adminstratorService = require('../services/adminService'); // importing authenticationService
const authorizationMiddleware = require('../middleware/authMiddleware'); // importing authMiddleware
const { User } = require("../models/index");



// authorization route
router.use(authorizationMiddleware(User));

router.patch('/:userId/delete-user', adminstratorService.deleteUser);

router.get('/:productId/get-product', adminstratorService.getProduct);

router.get('/:productId/delete-product', adminstratorService.getProduct);

router.get('/getAllUser', adminstratorService.getAllUser);

module.exports = router;