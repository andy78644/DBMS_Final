'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Best_sellers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: false,
        type: Sequelize.INTEGER
      },
      book_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      book_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rank: {
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
    await queryInterface.dropTable('Best_sellers');
  }
};