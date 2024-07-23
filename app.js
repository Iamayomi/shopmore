const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookiesParser = require("cookie-parser");

const globalErrorHandler = require('./services/errorService.js');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const checkoutRoute = require('./routes/checkoutRoute');
const cartRoute = require('./routes/cartRoute');
const deliveryAddressRoute = require('./routes/deliveryAddressRoute');
const reviewRoute = require('./routes/reviewRoute');

const AppError = require('./utils/appError');

const app = express();

app.set('trust proxy', true);

app.use(cors());

if (process.env.NODE_ENVIRONMENT === 'development') {
    app.use(morgan('dev'));
};


app.use(cookiesParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: '10kb' }));


app.use("/shopmore/users", userRoute);

app.use("/shopmore/v1/products", productRoute);

app.use("/shopmore/payment", checkoutRoute);

app.use("/shopmore/reviews", reviewRoute);

app.use("/shopmore/carts", cartRoute);

app.use("/shopmore/delivery-address", deliveryAddressRoute);


app.all("*", (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} no the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;