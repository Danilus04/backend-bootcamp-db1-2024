const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Product = require('./Product');
const User = require('./User');

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
});

Product.belongsToMany(User, {through: 'Favorite'});
User.belongsToMany(Product, {through: 'Favorite'});

Favorite.belongsTo(Product)

module.exports = Favorite;
