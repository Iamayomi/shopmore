const sequelize = require("../config/db");

const User = require("./userModel")(sequelize);
const DeliveryAddress = require("./deliveryAddressModel")(sequelize);
const Product = require("./productModel")(sequelize);
const Review = require("./reviewModel")(sequelize);
const Cart = require("./cartModel")(sequelize);
const CartItem = require("./cartItemModel")(sequelize);
const Payment = require("./paymentModel")(sequelize);
const CardPayment = require("./cardPaymentModel")(sequelize);
const Orderitem = require("./orderItemModel")(sequelize);
const Order = require("./orderModel")(sequelize);
const Category = require("./categoryModel")(sequelize);
const subCategory = require("./subCategoryModel")(sequelize);



// User.hasMany(Order);
// Order.belongsTo(User);

Order.hasMany(Orderitem);
Orderitem.belongsTo(Order);

// Order.hasOne(Payment);
// Payment.belongsTo(Order);

Product.hasOne(Orderitem);
Orderitem.belongsTo(Payment);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Order.hasMany(DeliveryAddress);
DeliveryAddress.belongsTo(Order);

User.hasMany(Order);
Order.belongsTo(User);


Category.hasMany(subCategory);
subCategory.belongsTo(Category);

subCategory.hasOne(Product);
Product.belongsTo(subCategory);

// Payment.hasOne(CardPayment);
// CardPayment.belongsTo(Payment);

sequelize.sync({ alter: true }).then(() => {
    console.log("Models synchronized with the database <<<<<<<<<<<<<>>>>>>>>>")
}).catch(err => {
    console.error("UNABLE to synchronize with the DATABASE", err)
});

module.exports = { User, Cart, Review, Product, Payment, Category,
subCategory, DeliveryAddress, CardPayment, CartItem, Order, Orderitem };