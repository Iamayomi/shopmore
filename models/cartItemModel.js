const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Cartitem = sequelize.define("cartitem", {

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        cartitemAddedAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        }

    },{
        timestamps: false,
    })

    return Cartitem;

};