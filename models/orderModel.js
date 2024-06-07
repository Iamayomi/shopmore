const { DataTypes } = require("sequelize");


const generateRandomId = function () {
    return Math.floor(Math.random() * 10000000);
};

module.exports = (sequelize) => {
    const Order = sequelize.define("order", {

        // orderId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     defaultValue: () => generateRandomId()
        // },

        price: {
            type: DataTypes.DECIMAL,
            // allowNull: false,
        },

        paymentMethod: {
            type: DataTypes.STRING,
            // allowNull: false,
            // ['credit_card', 'bank_transfer', 'btc']
        },  

       orderAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        },


    },{
        timestamps: false
    });

    return Order;

};

