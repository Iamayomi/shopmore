const { DataTypes } = require("sequelize");

const generateRandomId = function () {
	return Math.floor(Math.random() * 10000000);
};


module.exports = (sequelize) => {
    const subCategory = sequelize.define("subcategories", {

   //  	  subcategoryId: {
   //      	type: DataTypes.INTEGER,
			// allowNull: false,
   //      	primaryKey: true,
   //      	defaultValue: () => generateRandomId()
   //      },

        subCategoryName:  {
           type: DataTypes.STRING,
           unique: true
        }

    },{
        timestamps: false,
    });

    return subCategory;

};
