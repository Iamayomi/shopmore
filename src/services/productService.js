const sequelize = require("../config/db");

const { Review, Product } = require("../models/index");

const AppFeature = require("../utils/appFeature");
const appError = require("./../utils/appError");

exports.getProduct = async function (req, res, next) {
  try {
    const product = await Product.findOne({
      where: { id: req.params.productId * 1 },
      include: { model: Review },
    });

    if (!product) {
      return next(new appError("product with is this id is not found", 400));
    }

    res.status(200).json({
      status: "SUCCESS",
      data: {
        product,
      },
    });
  } catch (err) {
    next(new appError(`${err.message}`, 400));
  }
};

exports.getAllProducts = async function (req, res, next) {
  try {
    const appProperties = new AppFeature(req.query)
      .filter()
      .sort()
      .paginate()
      .limit();

    let products = await appProperties.searchProducts();

    if (products[1].rows.length === 0) {
      return next(new appError(`This product is not found`, 400));
    }

    res.status(200).json({
      status: "SUCCESS",
      total: products.length,
      data: {
        products: products,
      },
    });
  } catch (err) {
    next(new appError(`${err.message}`, 400));
  }
};
