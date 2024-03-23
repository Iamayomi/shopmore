const { Cart, User, Product, CartItem } = require("../models/index");
const appError = require("./../utils/appError");


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


exports.deleteMe = async function (req, res) {

  try {

    const user = await req.user;

    await user.update({ active: false });

  } catch (err) {
    next(new appError(`${err.message}`, 400));

  }
};


// exports.getCart = async function(req, res, next){
//   try {

//     if(!req.body.user) req.params.userId = req.userId.id;

//   const getCart = await Cart.findAll({ where: { userId: req.params.userid }, include: [{ model: CartItem, include: Product }] });

//    if (!getCart) {
//        next(new appError("Cart not found", 404));
//     };

//  // include: { model: Cart, include: { model: CartItem, include: [Product] } 
//     res.status(200).json({
//       status: "SUCCESS",
//       data: {
//         Carts: getCart
//       }
//     })
//   }catch(err){
//     next(new appError(`${err.message}`, 400));
//   }

// };