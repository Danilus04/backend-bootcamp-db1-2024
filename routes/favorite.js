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
      where: { userId: loggedUser.id, },
      include: [Product]
      //attributes: ['productId'],
    });
    
    

    res.json(favorites);
  } catch (error) {
    console.error('Erro ao obter favoritos:', error);
    res.status(500).json({ error: 'Erro ao obter favoritos' });
  }
});

// Rota para adicionar um favorito
router.post('/:id', middlewareAuthentication, async (req, res) => {
  try {
    const productId = req.params.id;
    const { loggedUser } = req;

    const favorite = await Favorite.create({ 
      userId: loggedUser.id, 
      productId 
    });
    
    res.status(201).json(favorite);
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
});

// Rota para remover um favorito
router.delete('/favorites/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const result = await Favorite.destroy({
      where: { userId, productId }
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