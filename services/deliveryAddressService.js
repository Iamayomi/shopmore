const { Cart, User, Order, DeliveryAddress } = require("../models/index");


exports.registerDeliveryAddress = async function (req, res, next) {
	try {
		let registerDeliveryAddress;

		const { firstname, lastname, phoneNumber, deliveryAddress, additionalInfo, region, city } = req.body;

		const getDeliveryAddress = await DeliveryAddress.findOne();

		if (getDeliveryAddress === null) {
			registerDeliveryAddress = await DeliveryAddress.create({
				firstname, lastname, phoneNumber,
				deliveryAddress, additionalInfo, region, city
			});

		} else {
			registerDeliveryAddress = await DeliveryAddress.findOne({ where: { id: getDeliveryAddress.id } });
			registerDeliveryAddress.firstname = firstname,
				registerDeliveryAddress.lastname = lastname,
				registerDeliveryAddress.phoneNumber = phoneNumber,
				registerDeliveryAddress.deliveryAddress = deliveryAddress,
				registerDeliveryAddress.additionalInfo = additionalInfo,
				registerDeliveryAddress.region = region,
				registerDeliveryAddress.city = city;
		};

		await registerDeliveryAddress.save();

		res.status(201).json({
			status: "SUCCESS",
			data: {
				registerDeliveryAddress
			}
		});

	} catch (err) {
		res.status(400).send(err.message);
	}


};

exports.getDeliveryAddress = async function (req, res, next) {
	try {
		let registerDeliveryAddress;

		const getDeliveryAddress = await DeliveryAddress.findOne();

		res.status(201).json({
			status: "SUCCESS",
			data: {
				getDeliveryAddress
			}
		});

	} catch (err) {
		res.status(400).send(err.message);
	}


};
