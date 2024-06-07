const { DataTypes } = require("sequelize");

const generateRandomId = function () {
    return Math.floor(Math.random() * 10000000);
};

module.exports = (sequelize) => {
    const Creditcard = sequelize.define("creditcard", {
        //   creditcardId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     defaultValue: () => generateRandomId()
        // },
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

        lastFourDigit: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Creditcard;

};
