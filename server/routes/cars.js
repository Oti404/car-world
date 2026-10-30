const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/cars
router.get('/', async (req, res) => {
  try {
    const cars = await prisma.car.findMany({ orderBy: { basePrice: 'desc' } });
    res.json(cars);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/cars/:id
router.get('/:id', async (req, res) => {
  try {
    const car = await prisma.car.findUnique({ where: { id: req.params.id } });
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/cars (Admin)
router.post('/', async (req, res) => {
  try {
    const { name, basePrice, stock, description, engineSpecs, images, options } = req.body;
    const car = await prisma.car.create({
      data: {
        name,
        basePrice: parseFloat(basePrice),
        stock: parseInt(stock) || 0,
        description: description || '',
        engineSpecs: engineSpecs || '',
        images: images || [],
        options: options || {}
      }
    });
    res.status(201).json(car);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/cars/:id (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { name, basePrice, stock, description, engineSpecs, images, options } = req.body;
    const car = await prisma.car.update({
      where: { id: req.params.id },
      data: {
        name,
        basePrice: parseFloat(basePrice),
        stock: parseInt(stock) || 0,
        description: description || '',
        engineSpecs: engineSpecs || '',
        images: images || [],
        options: options || {}
      }
    });
    res.json(car);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/cars/:id (Admin)
router.delete('/:id', async (req, res) => {
  try {
    await prisma.car.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
