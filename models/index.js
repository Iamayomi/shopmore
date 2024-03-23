const sequelize = require("../config/db");



const User = require("./userModel")(sequelize);
const Product = require("./productModel")(sequelize);
const Review = require("./reviewModel")(sequelize);
const Cart = require("./cartModel")(sequelize);
const CartItem = require("./cartItemModel")(sequelize);
const Payment = require("./paymentModel")(sequelize);
const CardPayment = require("./cardPaymentModel")(sequelize);
const Orderitem = require("./orderItemModel")(sequelize);
const Order = require("./orderModel")(sequelize);



User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Orderitem);
Orderitem.belongsTo(Order);

Order.hasOne(Payment);
Payment.belongsTo(Order);

Product.hasMany(Orderitem);
Orderitem.belongsTo(Payment);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Payment.hasOne(CardPayment);
CardPayment.belongsTo(Payment);



sequelize.sync({ alter: true }).then(() => {
    console.log("Models synchronized with the database <<<<<<<<<<<<<>>>>>>>>>")
}).catch(err => {
    console.error("UNABLE to synchronize with theDATABASE", err)
});

module.exports = { User, Cart, Review, Product, Payment, CardPayment, CartItem, Order, Orderitem };