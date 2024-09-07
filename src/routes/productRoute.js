////////////////// PRODUCT ROUTES ////////////////////////////////////

const express = require("express");
const router = express.Router();

const productService = require('../services/productService');
const authorizationMiddleware = require('../middleware/authMiddleware'); // importing authMiddleware
const { User } = require("../models/index");


// authorization route
router.use(authorizationMiddleware(User));

// user get all product route
router.get('/products', productService.getAllProducts);

// user get a product route
router.get('/:productId/get-product', productService.getProduct);



module.exports = router;