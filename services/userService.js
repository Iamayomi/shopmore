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
