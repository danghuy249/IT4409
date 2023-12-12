'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING, allowNull: false },
      paymentMethod: { type: Sequelize.STRING, allowNull: false },
      itemsPrice: { type: Sequelize.FLOAT, allowNull: false },
      shippingPrice: { type: Sequelize.FLOAT, allowNull: false },
      totalPrice: { type: Sequelize.FLOAT, allowNull: false },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      isPaid: { type: Sequelize.BOOLEAN, defaultValue: false },
      paidAt: { type: Sequelize.DATE },
      isDelivered: { type: Sequelize.BOOLEAN, defaultValue: false },
      deliveredAt: { type: Sequelize.DATE },
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
    await queryInterface.dropTable('Orders');
  }
};