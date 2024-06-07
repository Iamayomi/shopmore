const sequelize = require("../config/db");
const { Product, Category, subCategory } = require("../models/index");
const AppFeature = require("../utils/appFeature");
const appError = require("./../utils/appError");


exports.getProduct = async function (req, res, next) {
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

          const appProperties = new AppFeature(req.query).filter();

          let products = await appProperties.search();

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

     // try {

     //      const appProperties = new appFeature(req.query, Product);
     //      appProperties.filter().limiting().sorting().paginate();

     //      let products = await appProperties.searchProducts();

     //      const queryStr = JSON.stringify(req.query);

     //      if(queryStr.match(/\b(gte|gt|lte|lt)\b/g)){
     //          products = await sequelize.query(`SELECT * FROM products WHERE price <= '100'`);
     //           console.log(products)

     //      }


     //      res.status(200).json({
     //           status: "SUCCESS",
     //           total: products.length,
     //           data: {
     //                products: products
     //           }
     //      })
     // } catch (err) {
     //      next(new appError(`${err.message}`, 400));
     // }

};