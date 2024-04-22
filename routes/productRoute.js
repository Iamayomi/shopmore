const express = require("express");
const router = express.Router();
const productService = require('../services/productService');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware.protectRoute);
router.get('/products', productService.getAllProducts);
router.get('/:productId/get-product', productService.getProduct);



module.exports = router;