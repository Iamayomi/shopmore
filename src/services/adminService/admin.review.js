const { Review } = require("../../models/index");
const ErrorApp = require("../../utils/appError");

// admin get all reviews
exports.getProductReviews = async function (req, res, next) {
  try {
    const getReviews = await Review.findAll({ include: Product });

    res.status(200).json({
      status: "success",
      data: {
        reviews: getReviews,
      },
    });
  } catch (err) {
    return next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin delete a review
exports.deleteReview = async function (req, res, next) {
  try {
    const delReview = await Review.destroy({
      where: { id: req.params.reviewId },
    });

    res.status(200).json({
      status: "success",
      data: delReview,
    });
  } catch (err) {
    return next(new appError(`${err.message}`, 400));
  }
};
