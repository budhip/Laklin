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
    return queryInterface.bulkInsert('Transactions',[{
      UserId: 3,
      PacketId: 1,
      tgl_pesan: new Date(),
      tgl_selesai: new Date(),
      berat: 10,
      harga: 200000,
      petugas_laundry: 'Tono',
      status: 'belum selesai',
      no_invoice: 'laklin-20170719-3',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 4,
      PacketId: 2,
      tgl_pesan: new Date(),
      tgl_selesai: new Date(),
      berat: 5,
      harga: 150000,
      petugas_laundry: 'Tono',
      status: 'belum selesai',
      no_invoice: 'laklin-20170719-4',
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
  }
};
