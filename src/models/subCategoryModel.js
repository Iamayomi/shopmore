const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const subCategory = sequelize.define("subcategories", {

   //  	  subcategoryId: {
   //      	type: DataTypes.INTEGER,
			// allowNull: false,
   //      	primaryKey: true,
   //      	defaultValue: () => generateRandomId()
   //      },

        subcategoryName:  {
           type: DataTypes.STRING,
           unique: true
        }

    },{
        timestamps: false,
    });

    return subCategory;

};
