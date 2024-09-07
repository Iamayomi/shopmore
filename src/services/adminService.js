const { User, Review, Product, Category, subCategory } = require("../models/index");
const ErrorApp = require("./../utils/appError");

//// delete user
//// delete product
// update user profile
// update products
// create products
// get all user payment
//// all user ==
// get sell out product and remaining
// get review
// create admin

// const delUser = async function(){

// }



// admin create new category
exports.createCategory = async function (req, res, next) {

  try {
    const { categoryName } = req.body;

    const newCategory = await Category.create({ categoryName });

     res.status(201).json({
       status: "SUCCESS",
       data: {
            newCategory
       }
    })

  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};


// admin create new category
exports.createSubCategory = async function (req, res, next) {

  try {
    const { subcategoryName, categoryId } = req.body;

    const newSubCategory = await subCategory.create({ subcategoryName, categoryId });

     res.status(201).json({
       status: "SUCCESS",
       data: {
            newSubCategory
       }
    })

  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};



// admin create product
exports.createProduct = async function (req, res, next) {
  try {
    const { name, imageUrl, price, description, quantity, currency, subcategoryId } = req.body;

    const newProduct = await Product.create({ name, imageUrl, price, description, quantity, currency, subcategoryId });

     res.status(201).json({
             status: "SUCCESS",
             data: {
                  newProduct
             }
    })
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};



// admin get a product
exports.getProduct = async function (req, res, next) {
   try {
        const product = await Product.findByPk(req.params.productId * 1);

        if (!product) {
             return next(new ErrorApp("product with is this id is not found", 400));
        };

        res.status(200).json({
             status: "SUCCESS",
             data: {
                  product
             }
        })
   } catch (err) {
        next(new ErrorApp(`${err.message}`, 400));
   }
};


// admin delete a product
exports.deleteProduct = async function (req, res, next) {
   try {
        const product = await Product.findByPk(req.params.productId * 1);

        if (!product) {
             return next(new ErrorApp("product with is this id is not found", 400));
        };

        const delProduct = await Product.destroy({where: {id: product.id }})

        res.status(200).json({
             status: "SUCCESS",
             data: {
                  delProduct
             }
        })
   } catch (err) {
        next(new ErrorApp(`${err.message}`, 400));
   }
};


// admin edit a user

// this is where i stopped
exports.editUser = async function (req, res, next) {

  try {
   const { username, email, phoneNumber } = req.body;

    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return next(new ErrorApp(`this user account is not found`, 400));
    }

    user.username = username;
    user.email = email;
    user.phoneNumber = phoneNumber;
    await user.save();;


    res.status(201).json({
      status: "success",
      data: {
        userDetails: user
      }
    })

  } catch (err) {
    return next(new ErrorApp(`${err.message}`, 400));
  }

};


// admin get all users
exports.getAllUser = async function (req, res) {
  try {
    const getAllUser = await User.findAll();

    res.status(200).json({
      status: "succes",
      data: {
        users: getAllUser
      }
    })
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }

};


// admin delete a user
exports.deleteUser = async function (req, res, next) {

  try {

    const userId = req.params.userId;
    // const { email } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return next(new ErrorApp(`this user account is not found`, 400));
    }

    user.active = false;
    await user.save();

  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};


// admin get all reviews
exports.getProductReviews = async function(req, res, next){
  try {

    const getReviews = await Review.findAll({ include: Product}); 

    res.status(200).json({
      status: "success",
      data:  {
        reviews: getReviews
      }
    });

  } catch(err){
    return next(new ErrorApp(`${err.message}`, 400))
  }

};


// admin delete a review
exports.deleteReview = async function(req, res, next){
 try {

   const delReview = await Review.destroy({ where: { id: req.params.reviewId }}); 

    res.status(200).json({
      status: "success",
      data: delReview
    });

 }catch(err){
   return next(new appError(`${err.message}`, 400))
 }

};