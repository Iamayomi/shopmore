const express = require("express");
const router = express.Router();

const cartitemService = require('../services/cartitemService');
const authenticate = require('../middleware/authmiddleware');



router.use(authenticate.protectRoute);
router.delete("/:productId/delete-user-cartitem", cartitemService.delCartitem);
router.get("/:productId/get-user-cartitem", cartitemService.getCartitem);



module.exports = router;