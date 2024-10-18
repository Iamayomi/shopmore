const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookiesParser = require("cookie-parser");
const xss = require("xss-clean");

const globalErrorHandler = require("./services/errorService.js");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const checkoutRoute = require("./routes/checkoutRoute");
const cartRoute = require("./routes/cartRoute");
const adminRoute = require("./routes/adminRoute");
const deliveryAddressRoute = require("./routes/storeRoute.js");
const reviewRoute = require("./routes/reviewRoute");
const authenticateRoute = require("./routes/authRoute");
const storeRoute = require("./routes/storeRoute");
const apikeyRoute = require("./routes/apikeyRoute.js");

const AppError = require("./utils/appError");

const app = express();

app.set("trust proxy", 1);

app.use(cors());

if (process.env.NODE_ENVIRONMENT === "development") {
  app.use(morgan("dev"));
}

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Many request from this Ip, please try after 15 minutes",
  })
);

app.use(cookiesParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "10kb" }));

app.use(xss());

app.use("/api/v1/users", userRoute);

app.use("/api/v1/admins", adminRoute);

app.use("/api/key", apikeyRoute);

app.use("/api/v1/auth", authenticateRoute);

app.use("/api/v1/products", productRoute);

app.use("/api/v1/checkouts", checkoutRoute);

app.use("/api/v1/reviews", reviewRoute);

app.use("/api/v1/carts", cartRoute);

app.use("/api/v1/stores", storeRoute);

app.use("/api/v1/delivery-address", deliveryAddressRoute);

// get all invalid routes
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} no the server`, 404));
});

// console.log(new globalErrorHandler());
app.use(globalErrorHandler);
// app.use((err, req, res, next) => {
//   console.log(err)
// });


module.exports = app;
