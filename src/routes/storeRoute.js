////////////////// DELIVERY ADDRESS ROUTES ////////////////////////////////////

const express = require("express");
const router = express.Router();

const storeAddress = require("../services/storeService");
const { User } = require("../models/index");
const authorizationMiddleware = require("../middleware/authMiddleware"); // importing authMiddleware

// authorization route
router.use(authorizationMiddleware(User));

// user get delivery address route
router.get("/nearest-store", storeAddress.getNearestStore);

module.exports = router;
