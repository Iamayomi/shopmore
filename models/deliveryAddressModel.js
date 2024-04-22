const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

	const DeliveryAddress = sequelize.define("deliveryaddresses", {
		firstname: {
			type: DataTypes.STRING,
			allowNull: false
		},

		lastname: {
			type: DataTypes.STRING,
			allowNull: false
		},

		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},

		deliveryAddress: {
			type: DataTypes.STRING,
			allowNull: false
		},

		additionalInfo: {
			type:DataTypes.STRING,
		},

		region: {
			type:DataTypes.STRING,
			allowNull: false
		},

		city: {
			type:DataTypes.STRING,
			allowNull: false
	    }		
		 },{
	 		timestamps: false
	 });

	return DeliveryAddress;
};