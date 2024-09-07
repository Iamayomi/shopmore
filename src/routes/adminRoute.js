////////////////// ADMIN ROUTES ////////////////////////////////////

const express = require("express");
const router = express.Router();

const adminstratorService = require('../services/adminService'); // importing authenticationService
const authorizationMiddleware = require('../middleware/authMiddleware'); // importing authMiddleware
const { User } = require("../models/index");



// authorization route
router.use(authorizationMiddleware(User));

// admin delete user route
router.patch('/:userId/delete-user', adminstratorService.deleteUser);

// admin get a product route
router.get('/:productId/get-product', adminstratorService.getProduct);

// admin create new product route
router.post('/create-new-product', adminstratorService.createProduct);

// admin create new category route
router.post('/create-category', adminstratorService.createCategory);

// admin create new subcategory route
router.post('/create-subcategory', adminstratorService.createSubCategory);

// admin delete product route
router.delete('/:productId/remove-product', adminstratorService.deleteProduct);

// admin get all user route
router.get('/getAllUser', adminstratorService.getAllUser);

// admin get all reviews route
router.get("/get-products-reviews", adminstratorService.getProductReviews);

// admin delete review route
router.delete("/:reviewId/remove-product-review", adminstratorService.deleteReview);


module.exports = router; 