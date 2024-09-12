const { Review, Product } = require("../models/index");
const ErrorApp = require("./../utils/appError");

exports.addProductReview = async function (req, res, next) {
  try {
    const addReview = await Review.create({
      review: req.body.review,
      rating: req.body.rating,
      productId: req.params.productId,
      userId: req.params.userId,
    });

    res.status(201).json({
      status: "success",
      data: {
        review: addReview,
      },
    });
  } catch (err) {
    return next(new ErrorApp(`${err.message}`, 400));
  }
};
