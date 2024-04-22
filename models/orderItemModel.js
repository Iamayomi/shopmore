const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Orderitem = sequelize.define("orderitem", {

        quantity: {
            type: DataTypes.INTEGER,
        },

        totalPrice: {
            type: DataTypes.DECIMAL,
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
            // defaultValue: ['credit_card', 'bank_transfer', 'btc']
        },

        purchaseAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        },


    },{
        timestamps: false
    });

    return Orderitem;

};

// id
// orderid
// prod id
// quantity



// product
// totalprice
// status
// orderDate
// quantity