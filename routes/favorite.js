const express = require('express');

const Favorite = require('../models/Favorite')
const Product = require('../models/Product')

//const Category = require('../models/Category')

const router = express.Router();

// Rota para obter todos os favoritos de um usuário
router.get('/Products/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const favorites = await Favorite.findAll({
      where: { userId },
      include: [Product]
    });
    res.json(favorites);
  } catch (error) {
    console.error('Erro ao obter favoritos:', error);
    res.status(500).json({ error: 'Erro ao obter favoritos' });
  }
});

// Rota para adicionar um favorito
router.post('/favorites', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const favorite = await Favorite.create({ userId, productId });
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