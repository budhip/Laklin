'use strict';

const encryptMyPwd = require('../helpers/encryptMyPwd');

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
  }, {
    hooks: {
      beforeCreate: function(models) {
        let salt = encryptMyPwd.genRandomString(8);
        let password = models.password
        models.password = encryptMyPwd.createHash(password, salt);
        models.salt = salt;
      }
    }
  });
  return User;
};
