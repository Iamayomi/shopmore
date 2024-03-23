const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Creditcard = sequelize.define("creditcard", {

        // paymentId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'payments',
        //         key: 'id'
        //     }
        // },

        bankName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        routingNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        cardNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        expirationMonth: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        expirationYear: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        cardholderName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        cvv: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        lastfourDigit: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Creditcard;

};
