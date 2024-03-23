// donst errorProduction =  function (err, res){
// 	res.status(err.statusCode).json({
// 		status: err.status,
// 		message: err.message
// 	})
// }

const errorDevelopment = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack
	});
}

module.exports = (err, req, res, next) => {
	
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	
	if(process.env.NODE_ENVIRONMENT === 'development'){
		errorDevelopment(err, res);
	};
};