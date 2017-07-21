'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      nama: 'Admin Laundry',
      alamat: 'Jl. Admin',
      no_telp: '+6285219476208',
      email: 'ryo.bunraku@yahoo.com',
      username: 'admin',
      password: '523954306471942341e0970cbbdd3f0599feabf7e17d0e27e6a95a7e8f70c9ca',
      salt: '59efc3cc',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
