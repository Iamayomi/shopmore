const productModel = require("../models/productModel");
// const APISearch = require("../utils/appFeatures");

exports.getAllProducts = async function (req, res, next) {
     try {

          const queryFields = { ...req.query };

          const fields = ['sortBy', 'page', 'limit', 'fields'];

          fields.forEach(val => delete queryFields[val]);

          console.log(queryFields)

          let products = await productModel.findOne({ wehere: queryFields  });
     
          // if (req.query.limit) {
          //      const limitFields = req.query.limit.split(',');
          //      products = await productModel.findAll({ attributes: limitFields, raw: true });
          // };

          // if (req.query.sortBy) {

          //      let orderLists = ['DESC', 'ASC'];

          //      function getRandomly(lists) {
          //           return lists[ Math.floor(Math.random() * lists.length)];
          //      };

          //      let orderBy = getRandomly(orderLists);

          //      const sortBy = req.query.sortBy.split(',');

          //      sortBy.push(orderBy);

          //      console.log(sortBy)

          //      products = await productModel.findAll({ order: [sortBy] });
          // };

          // const page = + req.query.page * 1 || 1;

          // const limit = req.query.limit * 1 || 4;

          // const skip = (page - 1) * limit;

          // products = await productModel.findAll({ limit: limit, offset: skip });

          res.status(200).json({
               status: "SUCCESS",
               total: products.length,
               data: {
                    products: products
               }
          })
     } catch (err) {
          next(res.status(400).send(err.message))
     }
};