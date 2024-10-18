////////////////// PRODUCT ROUTES ////////////////////////////////////

const express = require("express");
const router = express.Router();

const productService = require('../services/productService');
const authorizationMiddleware = require('../middleware/authMiddleware'); // importing authMiddleware
const { User } = require("../models/index");
const { restrictRoute } = require("../middleware/restrictMiddleware");
const { authenticateApikey } = require("../middleware/authApikeyMiddleware");

// authorization route
router.use(authorizationMiddleware(User));

router.use(authenticateApikey);

// user get all product route
router.get('/', productService.getAllProducts);

// user get a product route
router.get('/:productId/get-product', productService.getProduct);


module.exports = router;