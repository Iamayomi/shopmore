////////////////// CHECKOUT ROUTES ////////////////////////////////////

const express = require("express");
const router = express.Router();

const checkoutService = require("../services/checkoutService");
const authorizationMiddleware = require("../middleware/authMiddleware"); // importing authMiddleware
const { User } = require("../models/index");
const { authenticateApikey } = require("../middleware/authApikeyMiddleware");


// api key middleware
router.use(authenticateApikey);

// authorization route
router.use(authorizationMiddleware(User));

// product checkout route
router.post("/:productId/checkout-session", checkoutService.checkoutSession);

// product webhook route
router.post("/webhook", checkoutService.webhookCheckout);

module.exports = router;
