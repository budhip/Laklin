'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      packet_id: {
        type: Sequelize.INTEGER
      },
      tgl_pesan: {
        type: Sequelize.DATE
      },
      tgl_selesai: {
        type: Sequelize.DATE
      },
      berat: {
        type: Sequelize.FLOAT
      },
      harga: {
        type: Sequelize.INTEGER
      },
      petugas_laundry: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      no_invoice: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Transactions');
  }
};