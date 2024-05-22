// Importações necessárias
const express = require('express');
const Category = require('../models/Category');

// Criação do router do Express
const router = express.Router();

// Rota para obter todas as categorias
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    res.status(500).json({ error: 'Erro ao obter categorias' });
  }
});

// Rota para criar uma nova categoria
// Categorias serão colocadas diretamente no banco de dados
/*
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    // Verifica se a categoria já existe
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({ error: 'Categoria já existe' });
    }

    // Cria a categoria
    const category = await Category.create({ name });

    res.status(201).json(category);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
});
*/

// Rota para obter uma categoria pelo ID
router.get('/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    res.json(category);
  } catch (error) {
    console.error('Erro ao obter categoria:', error);
    res.status(500).json({ error: 'Erro ao obter categoria' });
  }
});

// Rota para atualizar uma categoria
/* Diretamente pelo banco de dados
router.put('/:id', async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  try {
    // Verifica se a categoria existe
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    // Atualiza a categoria
    await category.update({ name });

    res.json(category);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
});
*/

// Rota para excluir uma categoria
/* diretamente pelo banco de dados
router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Verifica se a categoria existe
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    // Exclui a categoria
    await category.destroy();

    res.json({ message: 'Categoria excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    res.status(500).json({ error: 'Erro ao excluir categoria' });
  }
});
*/

// Exporta o router para ser utilizado na aplicação principal
module.exports = router;
