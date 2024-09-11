const { Cart, User, Order, Store } = require("../models/index");

exports.getStoreAddress = async function (req, res, next) {
  try {
    let registerDeliveryAddress;

    const getDeliveryAddress = await Store.findOne();

    res.status(201).json({
      status: "SUCCESS",
      data: {
        getDeliveryAddress,
      },
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
