const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize) => {

    const Product = sequelize.define("product", {
        title: {
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

        category: {
            type: DataTypes.STRING,
            allowNull: false
        },

        image: {
            type: DataTypes.STRING,
            allowNull: false
        },

        quantity: {
            type: DataTypes.INTEGER,
        },

        productAdded: {
            type: DataTypes.DATE,
        },

    });
    return Product;
};

