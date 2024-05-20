const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Category;
