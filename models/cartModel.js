const { DataTypes } = require("sequelize");

const generateRandomId = function () {
    return Math.floor(Math.random() * 10000000);
};

module.exports = (sequelize) => {
    const Cart = sequelize.define("cart", {

        // cartId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     defaultValue: () => generateRandomId()
        // },

        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'users',
        //         key: 'userId'
        //     }
        // },

        cartAddedAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        },

        subprice: {
            type: DataTypes.INTEGER
        }

    },{
        timestamps: false,
    });

    return Cart;

};
