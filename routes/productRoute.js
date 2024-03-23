const express = require("express");
const router = express.Router();
const productService = require('../services/productService');
const authMiddleware = require('../middleware/authMiddleware');



router.use(authMiddleware.protectRoute);
router.get('/all-product', productService.getAllProducts);
router.get('/:productId', productService.getProduct);



module.exports = router;