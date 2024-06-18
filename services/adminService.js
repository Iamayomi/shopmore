const { User, Review, Product, Category, subCategory } = require("./models/index");
// delete user
// delete product
// update user profile
// update products
// create products
// get all user payment
// all user ==
// get sell out product and remaining
// get review
// create admin

// const delUser = async function(){

// }

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