const express = require('express');
const app = express();
const globalErrorHandler = require('./controllers/errController');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');


app.use(express.json());


app.use("/shopmore/user", userRoute);
app.use("/shopmore/v1/products", productRoute);



app.all("*", (req, res, next) => {
   const err = new Error(`can't find ${req.originalUrl} no the server`);
   err.statusCode = 404;
   err.status = 'fail';
   next(err);
});

app.use(globalErrorHandler);

module.exports = app;