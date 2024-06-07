const { DataTypes } = require("sequelize");

const generateRandomId = function () {
    return Math.floor(Math.random() * 10000000);
};

module.exports = (sequelize) => {

    const Paymemt = sequelize.define("payment", {

        // paymentId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     defaultValue: () => generateRandomId()
        // },

        // productId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'products',
        //         key: 'id'
        //     }
        // },

        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },

        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false,
            // ['pending', 'completed', 'failed']
        },

        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
            // ['credit_card', 'bank_transfer', 'btc']
        },

        // creditcardId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'creditcard',
        //         key: 'id'
        //     }
        // },

    });

    return Paymemt;

};
