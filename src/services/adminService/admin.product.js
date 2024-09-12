const { Product } = require("../../models/index");
const ErrorApp = require("../../utils/appError");

// admin create product
exports.createProduct = async function (req, res, next) {
  try {
    const {
      name,
      imageUrl,
      price,
      description,
      quantity,
      currency,
      subcategoryId,
    } = req.body;

    const newProduct = await Product.create({
      name,
      imageUrl,
      price,
      description,
      quantity,
      currency,
      subcategoryId,
    });

    res.status(201).json({
      status: "SUCCESS",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin get a product
exports.getProduct = async function (req, res, next) {
  try {
    const product = await Product.findByPk(req.params.productId * 1);

    if (!product) {
      return next(new ErrorApp("product with is this id is not found", 400));
    }

    res.status(200).json({
      status: "SUCCESS",
      data: {
        product,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin get a product
exports.getProducts = async function (req, res, next) {
  try {
    const products = await Product.findAll();

    res.status(200).json({
      status: "SUCCESS",
      data: {
        products,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin delete a product
exports.deleteProduct = async function (req, res, next) {
  try {
    const product = await Product.findByPk(req.params.productId * 1);

    if (!product) {
      return next(new ErrorApp("product with is this id is not found", 400));
    }

    const delProduct = await Product.destroy({ where: { id: product.id } });

    res.status(200).json({
      status: "SUCCESS",
      data: {
        delProduct,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin delete a product
exports.updateProduct = async function (req, res, next) {
  try {
    const product = await Product.findByPk(req.params.productId * 1);

    if (!product) {
      return next(new ErrorApp("product with is this id is not found", 400));
    }

    // const newObj = {};
    const updateData = { ...req.body };
    // const fields = [
    //   "name",
    //   "imageUrl",
    //   "price",
    //   "description",
    //   "quantity",
    //   "currency",
    //   "subcategoryId",
    // ];
    // Object.keys(updateData).forEach((el) => {
    //   if (fields.includes(el)) newObj[el] = updateData[el];
    // });

    const updateProduct = await Product.update(updateData, {
      where: { id: req.params.productId },
      returning: true,
    });

    res.status(200).json({
      status: "SUCCESS",
      data: {
        updateProduct,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};
