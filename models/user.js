'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING
  });
  
  User.associate = (models) => {
    User.belongsToMany(models.Packets, {
      through: 'Transaction'
    })
  }
  
  return User;
};
