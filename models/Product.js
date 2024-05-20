const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Category = require('./Category');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
        model: Category,
        key: 'id'
        }
    }
}, {
    // Configurações adicionais para o modelo
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        type: 'FULLTEXT',
        fields: ['name', 'description']
      }
    ]
});

module.exports = Product;