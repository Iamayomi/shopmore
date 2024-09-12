const { subCategory, Product } = require("../../models/index");
const ErrorApp = require("../../utils/appError");

// admin create new subcategory
exports.createSubCategory = async function (req, res, next) {
  try {
    const { subcategoryName, categoryId } = req.body;

    const newSubCategory = await subCategory.create({
      subcategoryName,
      categoryId,
    });

    res.status(201).json({
      status: "SUCCESS",
      data: {
        newSubCategory,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin create get all subcategory
exports.getAllSubCategories = async function (req, res, next) {
  try {
    const getSubCategories = await subCategory.findAll({ include: Product });

    res.status(201).json({
      status: "SUCCESS",
      data: {
        getSubCategories,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin delete a subCategories
exports.deleteSubCategories = async function (req, res, next) {
  try {
    const delSubCategory = await subCategory.destroy({
      where: { id: req.params.subcategoryId },
    });

    res.status(200).json({
      status: "success",
      data: delReview,
    });
  } catch (err) {
    return next(new appError(`${err.message}`, 400));
  }
};

// admin edit a store
exports.editSubcategory = async function (req, res, next) {
  try {
    const updateSubcategory = await subCategory.update(req.body, {
      where: { id: req.params.subcategoryId },
      returning: true,
    });

    if (!updateSubcategory) {
      return next(new ErrorApp(`this subcategory id is not found`, 400));
    }

    res.status(201).json({
      status: "SUCCESS",
      data: {
        updateSubcategory,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};
