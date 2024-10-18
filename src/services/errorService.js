
const errorDevelopment = function (err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }

}

const errorProduction = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
}

module.exports = function (err, req, res, next) {
  // console.log(err)
  err.statusCode = 500;
  err.status = err.status || "error";

  // if (process.env.NODE_ENVIRONMENT === "development") {
  //   errorDevelopment(err, res);
  // }
  if (process.env.NODE_ENVIRONMENT === "development") {
    errorProduction(err, res);
  }
  next();
};
