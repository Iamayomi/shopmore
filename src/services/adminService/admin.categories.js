const { Category, subCategory } = require("../../models/index");
const ErrorApp = require("../../utils/appError");

// admin create new category
exports.createCategory = async function (req, res, next) {
  try {
    const { categoryName } = req.body;

    const newCategory = await Category.create({ categoryName });

    res.status(201).json({
      status: "SUCCESS",
      data: {
        newCategory,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin create get all category
exports.getAllCategories = async function (req, res, next) {
  try {
    const getsCategories = await Category.findAll({ include: subCategory });

    res.status(201).json({
      status: "SUCCESS",
      data: {
        getsCategories,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin delete a categories
exports.deleteCategories = async function (req, res, next) {
  try {
    const delCategory = await Category.destroy({
      where: { id: req.params.categoryId },
    });

    res.status(200).json({
      status: "success",
      data: delReview,
    });
  } catch (err) {
    return next(new appError(`${err.message}`, 400));
  }
};
