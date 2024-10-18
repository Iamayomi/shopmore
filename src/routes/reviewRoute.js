////////////////// REVIEW ROUTES ////////////////////////////////////


const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewService = require("../services/reviewService");
const authorizationMiddleware = require('../middleware/authMiddleware'); // importing authMiddleware
const { User } = require("../models/index");
const { authenticateApikey } = require("../middleware/authApikeyMiddleware");



// api key middleware
router.use(authenticateApikey);

// authorization route
router.use(authorizationMiddleware(User));

// user add review to product route
router.post("/:productId/:userId/add-review-product", reviewService.addProductReview);


module.exports = router;