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
      clientId: 1,
      token: "CustomToken1", 
      userFid: "005xx000Cust013c00",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      clientId: 2,
      token: "CustomToken2", 
      userFid: "005xx000Custf57ac5",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      clientId: 3,
      token: "CustomToken3", 
      userFid: "005xx000Cust0d268c",
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
