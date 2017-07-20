'use strict';
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    UserId: DataTypes.INTEGER,
    PacketId: DataTypes.INTEGER,
    tgl_pesan: DataTypes.DATE,
    tgl_selesai: DataTypes.DATE,
    berat: DataTypes.FLOAT,
    harga: DataTypes.INTEGER,
    petugas_laundry: DataTypes.STRING,
    status: DataTypes.STRING,
    no_invoice: DataTypes.STRING
  });
  
  Transaction.associate = (models) =>{
    Transaction.belongsTo(models.Packets);
    Transaction.belongsTo(models.User);
  }
  
  return Transaction;
};
