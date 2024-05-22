const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');

const router = express.Router();

// Rota para obter todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
});

// Rota para criar um novo produto
/* Criação de novo produto diretamente no banco
router.post('/', async (req, res) => {
  const { name, description, price, categoryId } = req.body;

  try {
    // Verifica se a categoria existe
    // TODO: fazer uma maneira para que no parametro seja enviado o nome da categoria e não o ID.
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    // Cria o produto
    const product = await Product.create({ name, description, price, categoryId });

    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});
*/

// Rota para obter um produto pelo ID
router.get('/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId, { include: Category });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Erro ao obter produto:', error);
    res.status(500).json({ error: 'Erro ao obter produto' });
  }
});

// Rota para atualizar um produto
/* Atualização de novo produto diretamente no banco
router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, categoryId } = req.body;

  try {
    // Verifica se o produto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Verifica se a categoria existe
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    // Atualiza o produto
    await product.update({ name, description, price, categoryId });

    res.json(product);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});
*/

// Rota para excluir um produto
/* exclusão de um produto diretamente no banco de dados
router.delete('/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    // Verifica se o produto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Exclui o produto
    await product.destroy();

    res.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
});
*/

// Exporta o router para ser utilizado na aplicação principal
module.exports = router;