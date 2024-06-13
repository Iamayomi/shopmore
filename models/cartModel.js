const { DataTypes } = require("sequelize");


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
            type: DataTypes.FLOAT
        }

    },{
        timestamps: false,
    });

    return Cart;

};
