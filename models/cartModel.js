const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Cart = sequelize.define("cart", {

        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'users',
        //         key: 'id'
        //     }
        // },


        // cartitemId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'cartitems',
        //         key: 'id'
        //     }
        // },

    })

    return Cart;

};