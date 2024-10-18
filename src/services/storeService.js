const geolib = require("geolib");
const axios = require("axios");
const { Cart, User, Order, Store } = require("../models/index");
const ErrorApp = require("./../utils/appError");

exports.getNearestStore = async function (req, res, next) {
  try {
    const { address } = req.body;

    if (!address) {
      return next(new ErrorApp("please provide an address", 400));
    }

    const ipAddress = await axios.get(`https://api.ipify.org?format=json`);

    const { ip } = ipAddress.data;

    const getLocation = await axios.get(
      `http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`
    );

    const { latitude, longitude } = getLocation.data;

    const stores = await Store.findAll();

    const nearStore = geolib.findNearest({ latitude, longitude }, stores);

    console.log(nearStore);

    res.status(201).json({
      status: "SUCCESS",
      data: {
        nearStore,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
