const { Review } = require("../models/index");
const appError = require("./../utils/appError");



exports.addProductReview = async function(req, res, next){
	try{
		// if(req.body.productId) req.body.productId = req.params.productId;

		console.log(req.params.productId)

		const addReview = await Review.create({
			review: req.body.review,
			rating: req.body.rating,
			productId: req.params.productId
		});	

		res.status(201).json({
			status: "success",
			data:  {
				review: addReview
			}
		});

	}catch(err){
		return next(new appError(`${err.message}`, 400))
	}

};