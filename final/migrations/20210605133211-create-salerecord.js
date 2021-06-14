'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Salerecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: false,
        type: Sequelize.INTEGER
      },
      record_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      selling_price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      mem_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      emp_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      check_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      book_id: {
        allowNull: false,
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Salerecords');
  }
};