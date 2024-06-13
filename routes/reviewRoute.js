const express = require("express");
const router = express.Router();
const reviewService = require("../services/reviewService");
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protectRoute);
router.post("/:productId/add-review-product", reviewService.addProductReview);

module.exports = router;