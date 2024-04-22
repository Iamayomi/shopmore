const { Cart, Product, User, CartItem } = require("../models/index");
const appError = require("./../utils/appError");



exports.addToCart = async function (req, res, next) {
  
  try {

    let cart, product, addCart;

    const { quantity } = req.body;

    const user = await User.findByPk(req.user.id , { include: Cart });

    if(user.cart === null){
        const cart = await Cart.create({ userId: req.user.id});

         product = await Product.findByPk(req.params.productId * 1);

         addCart = await CartItem.create({ cartId: cart.id, productId: product.id, quantity });
    } else {
       product = await Product.findByPk(req.params.productId * 1);

       const existingProduct = await CartItem.findOne({ where: { productId: product.id }});

       if(existingProduct){
         existingProduct.quantity += quantity;
        addCart =  await existingProduct.save();
       } else {
       
        addCart = await CartItem.create({ cartId: user.id, productId: product.id, quantity });

       }
        
    };

    const caRt = await CartItem.findAll({ where: { cartId: req.user.id }, include: Product});
    let list = [];

    caRt.forEach(val => list.push(val.product.price) );

    let sum = 0;

    for(let i = 0; i < list.length; i++){
        sum += list[i];
    }


     res.status(201).json({
      status: "SUCCESS",
      data: {
         addCart
      }
    });


  } catch (err) {
    return next(new appError(`${err.message}`, 400));
  }
};




exports.getCart = async function (req, res, next) {
  try {

    // if(!req.body.user) req.params.userId = req.userId.id;

    const getCart = await Cart.findAll({where: { userId: req.user.id},  include: { model: CartItem, include: [Product] } });
    // const getCart = await User.findOne({  include: [Cart]});

    // include: { model: Cart, include: { model: CartItem, include: [Product] } 
    res.status(200).json({
      status: "SUCCESS",
      data: {
        getCart
      }
    })
  } catch (err) {
  return  next(new appError(`${err.message}`, 400));
  }

};


exports.delACart = async function (req, res, next) {
  try {
    const getCart = await Cart.destroy({ where: { userId: req.user.id }, include: [{ model: CartItem, include: Product }] });

    if (!getCart) {
        next(new appError("No product is found", 404));
     };


    res.status(200).json({
      status: "SUCCESS",
      data: {
        Carts: null
      }
    })


  } catch (err) {
    return next(new appError(`${err.message}`, 400));
  }

};














