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

        const existProduct = await CartItem.findOne({ where: { productId: product.id }});

       if(existProduct) {

         existProduct.quantity += quantity;

         ddCart = await existProduct.save();
       } else {
       
         addCart = await CartItem.create({ cartId: user.id, productId: product.id, quantity });

       }
        
    };

    const userCartitem = await CartItem.findAll({ where: { cartId: req.user.id }, include: Product });

    res.status(201).json({
      status: "SUCCESS",
      data: {
         userCartitem
      }
    });


  } catch (err) {
    return next(new appError(`${err.message}`, 400));
  }
};




exports.getCart = async function (req, res, next) {
  try {


  const allProductCart = await Cart.findOne({ where: { userId: req.user.id},  include: { model: CartItem, include: [Product] } });


  let { cartitems, subprice } = allProductCart;

  console.log(cartitems)

  let priceList = [], quantity;

  cartitems.forEach(products => {

    const { price } = products.product;

    quantity = products.quantity;

    priceList.push(price);

  });
  
  const totalPrice = priceList.reduce((acc, cur) => acc + cur, 0);

  allProductCart.subprice = totalPrice * quantity;

  allProductCart.save();
 

  res.status(200).json({
      status: "SUCCESS",
      data: {
        allProductCart
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














