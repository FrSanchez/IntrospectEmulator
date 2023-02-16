'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER,
        unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
      },
      token: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
      },
      userFid: {
        type: Sequelize.STRING,
        allowNull: false,
            validate: {
                notEmpty: true,
            },
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tokens');
  }
};