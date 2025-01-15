const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Booking = sequelize.define('booking', {
  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true 
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  booking_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  vendor_details: {
    type: DataTypes.JSONB,
    allowNull: false
  }
});

module.exports = Booking;
