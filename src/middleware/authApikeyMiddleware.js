const ErrorApp = require("../utils/appError");
const Email = require("../utils/email");
const { APIKey } = require("../models/index");

exports.authenticateApikey = async function (req, res, next){

	try{
		const apikey = req.headers["x-api-key"];

		if(!apikey){
		 	return res.status(401).json({ "message": "Your Api key is mising"});
		};
		
		const checkKey = await APIKey.findOne({where: {key: apikey } })

		if(!checkKey){
		 	return res.status(401).json({ "message": "Invalid Api key"});
		};

	next()

	} catch(err){
		res.status(500).json({ "message": "Internal server Error"});
	}

}