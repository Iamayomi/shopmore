const { User } = require("../../models/index");
const ErrorApp = require("../../utils/appError");
const { createTokenCookies } = require("../../utils/sendTokenCookies");

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
// admin edit a user

exports.createAdmin = async function (req, res, next) {
  try {
    const { username, email, role, acceptedTerms, password } = req.body;

    const createAdmin = await User.create({ username, email, acceptedTerms, role, password });

    createTokenCookies(createAdmin, 201, `admin sucessfully created`, res);
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
}

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
    await user.save();

    res.status(201).json({
      status: "success",
      data: {
        userDetails: user,
      },
    });
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
        users: getAllUser,
      },
    });
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

// admin get a user
exports.getUser = async function (req, res, next) {
  try {
    const getUser = await User.findOne({
      where: { id: req.params.userId },
    });

    if (!getUser) {
      return next(new ErrorApp(`this user account is not found`, 400));
    }

    res.status(201).json({
      status: "success",
      data: {
        getUser,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};
