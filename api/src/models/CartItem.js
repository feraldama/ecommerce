const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('cartItem', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    }
  });
};