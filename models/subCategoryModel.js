const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const subCategory = sequelize.define("subCategories", {

        subCategory_name:  {
           type: DataTypes.STRING,
           unique: true
        }

    },{
        timestamps: false,
    });

    return subCategory;

};
