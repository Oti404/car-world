const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/news
router.get('/', async (req, res) => {
  try {
    const news = await prisma.news.findMany({ orderBy: { title: 'asc' } });
    res.json(news);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/news (Admin)
router.post('/', async (req, res) => {
  try {
    const { title, image, imageAlt, content } = req.body;
    const article = await prisma.news.create({
      data: { title, image: image || '', imageAlt: imageAlt || '', content }
    });
    res.status(201).json(article);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/news/:id (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { title, image, imageAlt, content } = req.body;
    const article = await prisma.news.update({
      where: { id: req.params.id },
      data: { title, image: image || '', imageAlt: imageAlt || '', content }
    });
    res.json(article);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/news/:id (Admin)
router.delete('/:id', async (req, res) => {
  try {
    await prisma.news.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
