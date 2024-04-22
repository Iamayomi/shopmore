const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize) => {

    const Product = sequelize.define("product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        description: {
            type: DataTypes.STRING(800),
            allowNull: false
        },

        currency: {
             type: DataTypes.STRING,
             allowNull: false
        },
              
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },

        quantity: {
            type: DataTypes.INTEGER,
        },

        productAddedAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        },

    },{
        timestamps: false,
    });
    return Product;
};

