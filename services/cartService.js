const { Cart, User, Product, CartItem } = require("../models/index");
const appFeature = require("../utils/appFeature");
const appError = require("./../utils/appError");




exports.addToCart = async function(req, res, next){
	try {

	 const { quantity } =  req.body;

    const cart = await Cart.create({ userId: req.user.id });

    const product = await Product.findByPk(req.params.productId * 1);

    if (!product) {
       next(new appError("product with is this id is not found", 400));
    };

    const addCart = await CartItem.create({ cartId: cart.id, productId: product.id, quantity: quantity});
    
    res.status(201).json({
           status: "SUCCESS",
           data: {
                addCart
           }
       });

  } catch (err) {
    next(new appError(`${err.message}`, 400));
  }
};


exports.getCart = async function(req, res, next){
  try {

    // if(!req.body.user) req.params.userId = req.userId.id;

  const getCart = await Cart.findAll({ where: { userId: req.user.id}, include: [{ model: CartItem, include: Product }] });

 // include: { model: Cart, include: { model: CartItem, include: [Product] } 
    res.status(200).json({
      status: "SUCCESS",
      data: {
        Carts: getCart
      }
    })
  }catch(err){
    next(new appError(`${err.message}`, 400));
  }

};


exports.delACart = async function (req, res, next){
  try{
   const getCart = await Cart.destroy({ where: { userId: req.user.id }, include: [{ model: CartItem, include: Product }] });

   // if (!getCart) {
   //     next(new appError("No product is found", 404));
   //  };


     res.status(200).json({
      status: "SUCCESS",
      data: {
        Carts: null
      }
    })


  } catch(err){
    next(new appError(`${err.message}`, 400));
  }

};














