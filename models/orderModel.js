const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Paymemt = sequelize.define("order", {

        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'users',
        //         key: 'id'
        //     }
        // },

        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false,
            // ['pending', 'completed', 'failed']
        },

        deliveryAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
            // ['credit_card', 'bank_transfer', 'btc']
        },
        purchaseDate: {
            type: DataTypes.DATE,
        }

    });

    return Paymemt;

};
