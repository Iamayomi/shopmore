const { DataTypes } = require("sequelize");


const generateRandomId = function () {
    return Math.floor(Math.random() * 10000000);
};


module.exports = (sequelize) => {
    const Cartitem = sequelize.define("cartitem", {

        // cartitemId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     defaultValue: () => generateRandomId()
        // },

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