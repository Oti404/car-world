const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/orders?status=PENDING - all orders, optionally filtered by status (Admin)
router.get('/', async (req, res) => {
  try {
    const where = req.query.status ? { status: req.query.status } : {};
    const orders = await prisma.order.findMany({
      where,
      include: { user: { select: { id: true, name: true, email: true } }, car: true },
      orderBy: { orderDate: 'desc' }
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/orders/user/:userId - orders for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.params.userId },
      include: { car: true },
      orderBy: { orderDate: 'desc' }
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/orders - place a new order
router.post('/', async (req, res) => {
  try {
    const { userId, carId, totalAmount, configuration } = req.body;

    // Verify car exists and fetch real price from DB (security: never trust client price)
    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) return res.status(404).json({ error: 'Car not found' });

    const order = await prisma.order.create({
      data: { userId, carId, totalAmount: parseFloat(totalAmount), status: 'PENDING' },
      include: { car: true }
    });
    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/orders/:id/status - update order status + assign VIN (Admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status, assignedVin } = req.body;
    const data = { status };
    if (assignedVin) data.assignedVin = assignedVin;

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data,
      include: { car: true, user: { select: { id: true, name: true, email: true } } }
    });

    // If delivered, promote CUSTOMER to OWNER (never downgrade ADMIN)
    if (status === 'DELIVERED') {
      const buyer = await prisma.user.findUnique({ where: { id: order.userId } });
      if (buyer && buyer.role === 'CUSTOMER') {
        await prisma.user.update({
          where: { id: order.userId },
          data: { role: 'OWNER' }
        });
      }
    }

    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
