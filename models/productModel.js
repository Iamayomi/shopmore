const { sq } = require("./../db");
const { DataTypes } = require("sequelize");

const productSchema = sq.define("product", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
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

    rating: {
        type: DataTypes.JSON,
        allowNull: false

    }

});

(async function () {
    try {
        await productSchema.sync();
        console.log("Products model synced")
    } catch (err) {
        console.error("Error syncing model", err)
    }
})();


module.exports = productSchema;
