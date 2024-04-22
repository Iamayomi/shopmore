const express = require("express");
const router = express.Router();

const deliveryAddress = require("../services/deliveryAddressService");
const authMiddleware = require("../middleware/authMiddleware");


router.use(authMiddleware.protectRoute);
router.post("/register-delivery-address", deliveryAddress.registerDeliveryAddress);
router.get("/get-delivery-address", deliveryAddress.getDeliveryAddress);

module.exports = router;