const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Apikey = sequelize.define("apikey", {

        key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        apikeyAddedAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        },

    }, {
        timestamps: false,
    });

    return Apikey;
};
