const { DataTypes } = require("sequelize");

const generateRandomId = function () {
	return Math.floor(Math.random() * 10000000);
};

module.exports = (sequelize) => {
    const Category = sequelize.define("categories", {

   //  	  categoryId: {
   //      	type: DataTypes.INTEGER,
			// allowNull: false,
   //      	primaryKey: true,
   //      	defaultValue: () => generateRandomId()
   //      },

        categoryName:  {
           type: DataTypes.STRING,
           unique: true
        }

    },{
        timestamps: false,
    });

    return Category;

};
