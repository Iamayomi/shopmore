////////////////// CHECKOUT ROUTES ////////////////////////////////////

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const checkoutService = require("../services/checkoutService");
const authorizationMiddleware = require("../middleware/authMiddleware"); // importing authMiddleware
const { User } = require("../models/index");

// authorization route
router.use(authorizationMiddleware(User));

// product checkout route
router.post("/:productId/checkout-session", checkoutService.checkoutSession);

router.use(bodyParser.raw({ type: "application/json" }));

// product webhook route
router.post("/webhook", checkoutService.webhookCheckout);

module.exports = router;
