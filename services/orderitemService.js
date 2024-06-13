const { Product, Orderitem, Payment } = require("../models/index");
const AppError = require("./../utils/AppError")

exports.addToOderItems = async function(req, res, next){

	const { quantity, totalPrice } = req.body;

	const product = await Product.findByPk(req.params.productId * 1);

	if(!product){
		next(new AppError("id with this prduct is not found", 404));
	};

	const addOrderitem = await Orderitem.create({ quantity,  productId: product.id });
	
};


