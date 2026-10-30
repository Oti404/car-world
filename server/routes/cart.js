const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/cart/:userId - get cart for user
router.get('/:userId', async (req, res) => {
  try {
    const items = await prisma.cartItem.findMany({
      where: { userId: req.params.userId },
      include: { car: true }
    });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/cart/items - add item to cart
router.post('/items', async (req, res) => {
  try {
    const { userId, carId, configuration } = req.body;

    // Fetch car from DB — never trust client-side price
    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) return res.status(404).json({ error: 'Car not found' });

    // Calculate price server-side from DB data + selected options
    let calculatedPrice = car.basePrice;
    if (configuration?.options) {
      calculatedPrice += configuration.options.reduce((sum, opt) => sum + (opt.price || 0), 0);
    }

    const item = await prisma.cartItem.create({
      data: { userId, carId, configuration: configuration || {}, calculatedPrice },
      include: { car: true }
    });
    res.status(201).json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/cart/items/:id - remove item from cart
router.delete('/items/:id', async (req, res) => {
  try {
    await prisma.cartItem.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/cart/:userId - clear entire cart
router.delete('/:userId', async (req, res) => {
  try {
    await prisma.cartItem.deleteMany({ where: { userId: req.params.userId } });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
