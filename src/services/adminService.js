const { User, Review, Product, Category, subCategory } = require("../models/index");
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


exports.getProduct = async function (req, res, next) {
   try {
        const product = await Product.findByPk(req.params.productId * 1);

        if (!product) {
             return next(new appError("product with is this id is not found", 400));
        };

        res.status(200).json({
             status: "SUCCESS",
             data: {
                  product
             }
        })
   } catch (err) {
        next(new appError(`${err.message}`, 400));
   }
};


exports.deleteProduct = async function (req, res, next) {
   try {
        const product = await Product.findByPk(req.params.productId * 1);

        if (!product) {
             return next(new appError("product with is this id is not found", 400));
        };

        const delProduct = await Product.destroy({where: {id: product.id }})

        res.status(200).json({
             status: "SUCCESS",
             data: {
                  delProduct
             }
        })
   } catch (err) {
        next(new appError(`${err.message}`, 400));
   }
};


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
    next(new appError(`${err.message}`, 400));
  }

};