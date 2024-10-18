////////////////// API KEY ROUTES ////////////////////////////////////


const express = require("express");
const router = express.Router();

const apikeyService = require('../services/apikeyService');
// const { User } = require("../models/index");
// const generateApiKey = require('../middleware/authMiddleware'); // importing authMiddleware


// add product to cart routes
router.post('/generate', apikeyService.generateApiKey);

// console.log(apikeyService.generateApiKey)

module.exports = router;