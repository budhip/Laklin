'use strict';
module.exports = function(sequelize, DataTypes) {
  var Packets = sequelize.define('Packets', {
    nama_paket: DataTypes.STRING,
    harga_paket: DataTypes.INTEGER
  });
  
  
Packets.associate = (models) =>{
  Packets.belongsToMany(models.User, {
    through: 'Transaction'
  })
}
  return Packets;
};
