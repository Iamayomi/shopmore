const express = require('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookiesParser = require("cookie-parser")

const globalErrorHandler = require('./services/errorService.js');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const cartitemRoute = require('./routes/cartitemRoute');
const orderitemRoute = require('./routes/orderitemsRoute');
const deliveryAddressRoute = require('./routes/deliveryAddressRoute');



const AppError = require('./utils/appError');

const app = express();

if (process.env.NODE_ENVIRONMENT === 'development') {
    app.use(morgan('dev'));
};


app.use(cookiesParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: '10kb' }));


app.use("/shopmore/users", userRoute);
app.use("/shopmore/v1/products", productRoute);

app.use("/shopmore/carts", cartRoute);
app.use("/shopmore/cart-items", cartitemRoute);

app.use("/shopmore/order-items", orderitemRoute);

app.use("/shopmore/delivery-address", deliveryAddressRoute);


app.all("*", (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} no the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;