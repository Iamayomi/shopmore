////////////////// CHECKOUT ROUTES ////////////////////////////////////


const express = require('express');
const router = express.Router();

const checkoutService = require('../services/checkoutService');
const authorizationMiddleware = require('../middleware/authMiddleware'); // importing authMiddleware
const { User } = require("../models/index");


// authorization route
router.use(authorizationMiddleware(User));

// product checkout route
router.get('/:productId/checkout-session', checkoutService.checkoutSession);

module.exports = router;