const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Cartitem = sequelize.define("cartitem", {

        // productId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'products',
        //         key: 'id'
        //     }
        // },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    })

    return Cartitem;

};