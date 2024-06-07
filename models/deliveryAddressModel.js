const {DataTypes} = require("sequelize");

const generateRandomId = function () {
	return Math.floor(Math.random() * 10000000);
};

module.exports = (sequelize) => {

	const DeliveryAddress = sequelize.define("deliveryaddresses", {

   // deliveryaddressId: {
   //      	type: DataTypes.INTEGER,
			// allowNull: false,
   //      	primaryKey: true,
   //      	defaultValue: () => generateRandomId()
   //      },

		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},

		lastName: {
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