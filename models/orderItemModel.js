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

        // orderId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'orders',
        //         key: 'id'
        //     }
        // },

        // productId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'products',
        //         key: 'id'
        //     }
        // },

        pricePurchase: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },

        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
            // ['credit_card', 'bank_transfer', 'btc']
        },

        purchaseDate: {
            type: DataTypes.DATE,
            defaultValue: true
        },

    });

    return Paymemt;

};
