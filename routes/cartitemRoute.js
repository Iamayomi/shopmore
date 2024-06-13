const express = require("express");
const router = express.Router();

const cartItemService = require('../services/cartItemService');
const authenticate = require('../middleware/authMiddleware');



router.use(authenticate.protectRoute);
router.delete("/:productId/delete-user-cartitem", cartItemService.delCartItem);
router.get("/:productId/get-user-cartitem", cartItemService.getCartItem);



module.exports = router;