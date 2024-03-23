const { Product } = require("../models/index");
const appFeature = require("../utils/appFeature");
const appError = require("./../utils/appError");


exports.getProduct = async function(req, res, next){
     try {
          const product = await Product.findByPk(req.params.productId * 1);

         if (!product) {
             return next(new appError("product with is this id is not found", 400));
         };


          res.status(200).json({
               status: "SUCCESS",
               data: {
                     product
               }
          })
     } catch (err) {
          next(new appError(`${err.message}`, 400));
     }
};

exports.getAllProducts = async function (req, res, next) {
     try {

          const appProperties = new appFeature(req.query, Product);
          appProperties.filter().limiting().sorting().paginate();

          const products = await appProperties.searchProducts();

          res.status(200).json({
               status: "SUCCESS",
               total: products.length,
               data: {
                    products: products
               }
          })
     } catch (err) {
          next(new appError(`${err.message}`, 400));
     }

};