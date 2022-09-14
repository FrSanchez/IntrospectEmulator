'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Tokens', [{ 
      clientId: 101,
      token: "CustomToken101", 
      userFid: "005xx000Cust013c00",
      active: true,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      clientId: 102,
      token: "CustomToken102",
      userFid: "005xx000Custf57ac5",
      active: true,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      clientId: 103,
      token: "CustomToken103", 
      userFid: "005xx000Cust0d268c",
      active: false,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Tokens', null, {});
  }
};
