////////////////// ADMIN ROUTES ////////////////////////////////////

const express = require("express");
const router = express.Router();

const adminstratorUser = require("../services/adminService/admin.user"); // importing admin.user from adminstratorService
const adminstratorProduct = require("../services/adminService/admin.product"); // importing admin.product from adminstratorService
const adminstratorCategory = require("../services/adminService/admin.categories"); // importing admin.categories from adminstratorService
const adminstratorSubCategory = require("../services/adminService/admin.subcategory"); // importing admin.subcategories from adminstratorService
const adminstratorReview = require("../services/adminService/admin.review"); // importing admin.review from adminstratorService
const adminstratorStore = require("../services/adminService/admin.store"); // importing admin.store from adminstratorService

const authorizationMiddleware = require("../middleware/authMiddleware"); // importing authMiddleware
const { restrictRoute } = require("../middleware/restrictMiddleware");
// const { User } = require("../models/index");


// authorization route
// router.use(authorizationMiddleware(User));

//////////////// ADMIN USER ROUTES ///////////////////////


//create admin route
router.post("/register-admin", adminstratorUser.createAdmin);

// restrict user middleware route 
router.use(restrictRoute("user-"));

// admin delete user route
router.patch("/:userId/delete-user", adminstratorUser.deleteUser);

// admin edit user route
router.patch("/:userId/edit-user", adminstratorUser.editUser);

// admin get all user route
router.get("/getAllUser", adminstratorUser.getAllUser);

// admin get a user route
router.get("/:userId/get-user", adminstratorUser.getUser);

//////////////// ADMIN PRODUCT ROUTES ///////////////////////

// admin get a product route
router.get("/:productId/get-product", adminstratorProduct.getProduct);

// admin create new product route
router.post("/create-new-product", adminstratorProduct.createProduct);

// admin delete product route
router.delete("/:productId/remove-product", adminstratorProduct.deleteProduct);

// admin delete product route
router.patch("/:productId/update-product", adminstratorProduct.updateProduct);

// admin get all product route
router.get("/get-products", adminstratorProduct.getProducts);

// // admin get soldout product route
// router.get("/get-products", adminstratorProduct.getProducts);

//////////////// ADMIN PRODUCT CATEGORIES ROUTES ///////////////////////

// admin create new category route
router.post("/create-category", adminstratorCategory.createCategory);

// admin get all category route
router.get("/gets-categories", adminstratorCategory.getAllCategories);

// admin edit category route
router.post("/:categoryId/edit-category", adminstratorCategory.createCategory);

// admin delete all category route
router.delete(
  "/:categoryId/delete-category",
  adminstratorCategory.deleteCategories
);

//////////////// ADMIN PRODUCT SUBCATEGORIES ROUTES ///////////////////////

// admin create new subcategory route
router.post("/create-subcategory", adminstratorSubCategory.createSubCategory);

// admin get all subcategory route
router.get("/gets-subcategories", adminstratorSubCategory.getAllSubCategories);

// admin edit subcategory route
router.post(
  "/:subcategoryId/edit-subcategory",
  adminstratorSubCategory.editSubcategory
);

// admin delete a subcategory route
router.delete(
  "/:subcategoryId/delete-subcategory",
  adminstratorSubCategory.deleteSubCategories
);

//////////////// ADMIN PRODUCT REVIEWS ROUTES ///////////////////////

// admin get all reviews route
router.get("/get-products-reviews", adminstratorReview.getProductReviews);

// admin delete review route
router.delete(
  "/:reviewId/remove-product-review",
  adminstratorReview.deleteReview
);

//////////////// ADMIN STORES ROUTES ///////////////////////

// admin create store route
router.post("/add-new-store", adminstratorStore.createStore);

// admin get store route
router.get("/:storeId/get-store", adminstratorStore.getStore);

// admin edit store route
router.patch("/:storeId/edit-store", adminstratorStore.editStore);

// admin get all store route
router.get("/get-stores", adminstratorStore.getStores);

// admin get delete store route
router.delete("/:storeId/delete-stores", adminstratorStore.delStore);

module.exports = router;
