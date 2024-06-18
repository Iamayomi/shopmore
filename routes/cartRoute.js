const express = require("express");
const router = express.Router({ mergeParams: true});
const cartService = require('../services/cartService');
const authenticate = require('../middleware/authMiddleware');


router.use(authenticate.protectRoute);
router.post('/:productId/add-to-cart', cartService.addToCart);
router.get('/get-user-cart', cartService.getCart);
router.delete('/delete-user-cart', cartService.delACart);



module.exports = router;