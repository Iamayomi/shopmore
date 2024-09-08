////////////////// ADMIN ROUTES ////////////////////////////////////

const express = require("express");
const router = express.Router();

const adminstratorService = require("../services/adminService"); // importing authenticationService
const authorizationMiddleware = require("../middleware/authMiddleware"); // importing authMiddleware
const { User } = require("../models/index");

// authorization route
router.use(authorizationMiddleware(User));

//////////////// ADMIN USER ROUTES ///////////////////////

// admin delete user route
router.patch("/:userId/delete-user", adminstratorService.deleteUser);

// admin get all user route
router.get("/getAllUser", adminstratorService.getAllUser);

//////////////// ADMIN PRODUCT ROUTES ///////////////////////

// admin get a product route
router.get("/:productId/get-product", adminstratorService.getProduct);

// admin create new product route
router.post("/create-new-product", adminstratorService.createProduct);

// admin delete product route
router.delete("/:productId/remove-product", adminstratorService.deleteProduct);

// admin delete product route
router.patch("/:productId/update-product", adminstratorService.updateProduct);

// admin create new category route
router.post("/create-category", adminstratorService.createCategory);

// admin create new subcategory route
router.post("/create-subcategory", adminstratorService.createSubCategory);

// admin get all reviews route
router.get("/get-products-reviews", adminstratorService.getProductReviews);

// admin create store route
router.post("/add-new-store", adminstratorService.createStore);

// admin delete review route
router.delete(
  "/:reviewId/remove-product-review",
  adminstratorService.deleteReview
);

module.exports = router;
