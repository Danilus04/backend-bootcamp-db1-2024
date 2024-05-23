const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Category = require('./Category');
const Favorite = require('./Favorite');
const User = require('./User');

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
    imageUrl: {
        type: DataTypes.STRING, // Coluna para a URL da imagem
        allowNull: true
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

Product.belongsTo(Category, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
      allowNull: false,
    },
});

//

Product.associate = (models) => {
    Product.belongsToMany(User, { through: Favorite, foreignKey: 'productId' });
};



module.exports = Product;