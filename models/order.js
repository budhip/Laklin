'use strict';
module.exports = function(sequelize, DataTypes) {
  var order = sequelize.define('order', {
    tgl_order: DataTypes.DATE,
    tgl_selesai: DataTypes.DATE,
    kg: DataTypes.FLOAT,
    harga: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return order;
};