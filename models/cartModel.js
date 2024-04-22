const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Cart = sequelize.define("cart", {

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },

        cartAddedAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        },

        subPrice: {
            type: DataTypes.INTEGER
        }

    },{
        timestamps: false,
    });

    return Cart;

};
