const { Cart, User, Product, CartItem } = require("../models/index");
const ErrorApp = require("./../utils/appError");


// user add profile
exports.changeUserDetails = async function (req, res, next) {

  try {
    const { username, email, phoneNumber } = req.body;

    const user = await User.findByPk(req.user.id);

    user.username = username;
    user.email = email;
    user.phoneNumber = phoneNumber;
    await user.save();

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


// user change password
exports.changePassword = async function (req, res, next) {
  try {

    const user = await User.findByPk(req.user.id);

    const { newPassword, confirmNewPassword } = req.body;

    if (!newPassword || !confirmNewPassword) {
      return next(new ErrorApp("Enter newPassword and confirmNewPassword", 400));
    };

    if (!(newPassword === confirmNewPassword)) {
      next(new ErrorApp(`newPassWord and comfirmNewPassword are not the same`, 400));
    };

    user.password = newPassword;
    user.confirmPassword = confirmNewPassword;
    await user.save();

    res.status(201).json({
      status: "success",
      data: {
        updateUser: user
      }
    })

  } catch (err) {
    return next(new ErrorApp(`${err.message}`, 400));
  }
};



exports.deleteMe = async function (req, res, next) {

  try {

    let user = await req.user;

    const { deleteAccount } = req.body;

    if (!deleteAccount) {
      return next(new ErrorApp(`choose True to deactivate your account`, 400));
    }

    await user.update({ active: false });

  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};
