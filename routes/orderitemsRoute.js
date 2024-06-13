const express = require("express");
const router = express.Router();
const orderItemService = require('../services/orderItemService');


router.post('/:productId/add-product-orderitem', orderItemService.addToOderItems);


module.exports = router;