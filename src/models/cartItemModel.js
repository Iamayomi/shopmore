const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Cartitem = sequelize.define("cartitem", {

        // cartitemId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     defaultValue: () => generateRandomId()
        // },

        // id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'users',
        //         key: 'id'
        //     }
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