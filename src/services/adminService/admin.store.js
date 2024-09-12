const { Store } = require("../../models/index");
const ErrorApp = require("../../utils/appError");

// admin create a store
exports.createStore = async function (req, res, next) {
  try {
    const { name, address, latitude, longitude } = req.body;

    const createNewStore = await Store.create({
      name,
      address,
      latitude,
      longitude,
    });

    res.status(201).json({
      status: "SUCCESS",
      data: {
        createNewStore,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin get a store
exports.getStore = async function (req, res, next) {
  try {
    const getStore = await Store.findOne({
      where: { id: req.params.storeId },
    });
    if (!getStore) {
      return next(new ErrorApp(`this store id is not found`, 400));
    }
    res.status(201).json({
      status: "SUCCESS",
      data: {
        getStore,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin get a store
exports.getStores = async function (req, res, next) {
  try {
    const getStore = await Store.findAll();

    res.status(201).json({
      status: "SUCCESS",
      data: {
        getStore,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin get a store
exports.editStore = async function (req, res, next) {
  try {
    const updateStore = await Store.update(req.body, {
      where: { id: req.params.storeId },
      returning: true,
    });

    if (!updateStore) {
      return next(new ErrorApp(`this store id is not found`, 400));
    }

    res.status(201).json({
      status: "SUCCESS",
      data: {
        updateStore,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};

// admin delete a store
exports.delStore = async function (req, res, next) {
  try {
    const store = await Store.findByPk(req.params.storeId * 1);

    if (!store) {
      return next(new ErrorApp("product with is this id is not found", 400));
    }

    const delStore = await Product.destroy({ where: { id: product.id } });

    res.status(201).json({
      status: "SUCCESS",
      data: {
        delStore,
      },
    });
  } catch (err) {
    next(new ErrorApp(`${err.message}`, 400));
  }
};
