////////////////// CART ROUTES ////////////////////////////////////


const express = require("express");
const router = express.Router({ mergeParams: true });

const cartService = require('../services/cartService');
const { User } = require("../models/index");
const authorizationMiddleware = require('../middleware/authMiddleware'); // importing authMiddleware


// authorization route
router.use(authorizationMiddleware(User));

// add product to cart routes
router.post('/:productId/add-to-cart', cartService.addToCart);

// get a user cart route 
router.get('/get-user-cart', cartService.getCart);

// user delete cart route
router.delete('/reomve-user-cart', cartService.delACart);


module.exports = router;