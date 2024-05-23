const express = require('express');

const { middlewareAuthentication } = require('../middlewares/authentication');
const Favorite = require('../models/Favorite')
const Product = require('../models/Product')
const { Op } = require('sequelize');

//const Category = require('../models/Category')

const router = express.Router();

// Rota para obter todos os favoritos de um usuário

router.get('/', middlewareAuthentication, async (req, res) => {
  try {
    const { loggedUser } = req;
    const favorites = await Favorite.findAll({
      where: { user_id: loggedUser.id, },
      include: [Product]
      
    });
    
    
    
    res.json(favorites);
  } catch (error) {
    console.error('Erro ao obter favoritos:', error);
    res.status(500).json({ error: 'Erro ao obter favoritos' });
  }
});

// Rota para adicionar um favorito
router.post('/:productId', middlewareAuthentication, async (req, res) => {
  try {
    
    const { loggedUser, params } = req;
    const { productId } = params;
    // Impedir que favorite um produto inexistente
    const favorite = await Favorite.create({ 
      UserId: loggedUser.id, 
      ProductId: productId,
    });
    
    res.status(201).json(favorite);
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
});

// Rota para remover um favorito
router.delete('/:productId', middlewareAuthentication, async (req, res) => {
  try {

    const { loggedUser, params } = req;
    const { productId } = params;

    const result = await Favorite.destroy({
      where: { 
        UserId: loggedUser.id, 
        ProductId: productId}
    });
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Favorito não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    res.status(500).json({ error: 'Erro ao remover favorito' });
  }
});

module.exports = router;