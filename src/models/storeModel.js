const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Store = sequelize.define(
    "stores",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.STRING,
      },

      longitude: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Store;
};
