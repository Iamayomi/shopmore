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
