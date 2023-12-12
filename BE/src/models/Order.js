'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
    }
  }
  Order.init({
    fullName: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
    itemsPrice: { type: DataTypes.FLOAT, allowNull: false },
    shippingPrice: { type: DataTypes.FLOAT, allowNull: false },
    totalPrice: { type: DataTypes.FLOAT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    isPaid: { type: DataTypes.BOOLEAN, defaultValue: false },
    paidAt: { type: DataTypes.DATE },
    isDelivered: { type: DataTypes.BOOLEAN, defaultValue: false },
    deliveredAt: { type: DataTypes.DATE },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};