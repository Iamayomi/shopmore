const { Cart, Product, User, CartItem } = require("../models/index");
const appError = require("./../utils/appError");

exports.addToCart = async function (req, res, next) {
  try {
    let cartitem;

    const user = await User.findOne({
      where: { id: req.user.id },
      include: { model: Cart },
    });

    const product = await Product.findByPk(req.params.productId * 1);

    const { quantity } = req.body;

    if (user.cart === null) {
      const createCart = await Cart.create({ userId: req.user.id });
    }

    const cart = await Cart.findOne({ where: { userId: req.user.id } });

    const existProduct = await CartItem.findOne({
      where: { cartId: cart.id, productId: product.id },
    });

    if (existProduct) {
      existProduct.quantity += quantity;
      cartitem = await existProduct.save();
    } else {
      cartitem = await CartItem.create({
        cartId: cart.id,
        productId: product.id,
        quantity,
      });
    }

    res.status(201).json({
      status: "SUCCESS",
      data: {
        cartitem,
      },
    });
  } catch (err) {
    return next(new appError(`${err}`, 400));
  }
};

exports.getCart = async function (req, res, next) {
  try {
    const cartitems = await CartItem.findAll({
      where: { cartId: req.user.id },
      include: Product,
    });

    const cart = await Cart.findOne({ where: { userId: req.user.id } });

    let priceList = [],
      productQuantity = [];

    cartitems.forEach((products) => {
      const { quantity } = products;
      const { price } = products.product;

      productQuantity.push(quantity);

      priceList.push(price);
    });

    function addList(list) {
      return list.reduce((acc, cur) => acc + cur, 0);
    }

    cart.subprice = addList(priceList) * addList(productQuantity);

    await cart.save();

    res.status(200).json({
      status: "SUCCESS",
      data: {
        cart,
      },
    });
  } catch (err) {
    return next(new appError(`${err.message}`, 400));
  }
};

exports.delACart = async function (req, res, next) {
  try {
    const getCart = await Cart.destroy({
      where: { userId: req.user.id },
      include: [{ model: CartItem, include: Product }],
    });

    if (!getCart) {
      next(new appError("No product is found", 404));
    }

    res.status(200).json({
      status: "SUCCESS",
      data: {
        Carts: null,
      },
    });
  } catch (err) {
    return next(new appError(`${err.message}`, 400));
  }
};
