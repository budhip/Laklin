'use strict';
module.exports = function(sequelize, DataTypes) {
  var Packets = sequelize.define('Packets', {
    nama_paket: DataTypes.STRING,
    harga_paket: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Packets;
};