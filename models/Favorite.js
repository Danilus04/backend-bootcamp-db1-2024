const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Product = require('./Product');
const User = require('./User');

const Favorite = sequelize.define('Favorite', {
  userId: {
    type: DataTypes.BIGINT({ unsigned: true }) ,
    references: {
      model: 'users', // Nome da tabela de Users
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'products', // Nome da tabela de Products
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
});

//Favorite.belongsTo(Product);
//Favorite.belongsTo(User);


module.exports = Favorite;

