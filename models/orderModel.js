const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Order = sequelize.define("order", {

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

