const express = require('express');
const router = express.Router();
const checkoutService = require('../services/checkoutService');
const authenticate = require('../middleware/authMiddleware');

router.use(authenticate.protectRoute);


router.get('/:productId/checkout-session', checkoutService.checkoutSession);

module.exports = router;