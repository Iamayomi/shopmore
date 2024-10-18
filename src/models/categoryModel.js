const { DataTypes } = require("sequelize");

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
