const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Category = sequelize.define("Categories", {

        category_name:  {
           type: DataTypes.STRING,
           unique: true
        }

    },{
        timestamps: false,
    });

    return Category;

};
