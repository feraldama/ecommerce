const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('order', {
    status: {
      type: DataTypes.ENUM('Creada', 'Procesando', 'Cancelada', 'Completada'),
      allowNull: false,
      defaultValue: 'Creada'
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    }
  });
};