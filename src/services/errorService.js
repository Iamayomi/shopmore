class productionError {
  errorResponse(err, res) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
}

class customError {
  constructor() {
    this.statusCode = err.statusCode || 500;
    this.status = err.status || "error";
  }

  productError(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
  }
}

// module.exports = new productionError();
// module.exports = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   if (process.env.NODE_ENVIRONMENT === "development") {
//     errorDevelopment(err, res);
//   }
// };
