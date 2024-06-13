const express = require("express");
const router = express.Router({ mergeParams: true});
const cartService = require('../services/cartService');
const authenticate = require('../middleware/authMiddleware');


router.use(authenticate.protectRoute);
router.post('/add-to-carts/:productId', cartService.addToCart);
router.get('/get-user-carts', cartService.getCart);
router.delete('/delete-user-carts', cartService.delACart);



module.exports = router;