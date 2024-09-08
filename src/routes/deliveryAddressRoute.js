////////////////// DELIVERY ADDRESS ROUTES ////////////////////////////////////

const express = require("express");
const router = express.Router();

const deliveryAddress = require("../services/deliveryAddressService");
const { User } = require("../models/index");
const authorizationMiddleware = require("../middleware/authMiddleware"); // importing authMiddleware

// authorization route
router.use(authorizationMiddleware(User));

// user add delivery address route
router.post(
  "/register-delivery-address",
  deliveryAddress.registerDeliveryAddress
);

// user get delivery address route
router.get("/get-delivery-address", deliveryAddress.getDeliveryAddress);

module.exports = router;
