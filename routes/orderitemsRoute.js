const express = require("express");
const router = express.Router();
const orderitemService = require('../services/orderitemService');



router.post('/:productId/add-product-orderitem', orderitemService.addToOderitems);


module.exports = router;