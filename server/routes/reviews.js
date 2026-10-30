const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/reviews/car/:carId - approved reviews for a car
router.get('/car/:carId', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { carId: req.params.carId, status: 'APPROVED' },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(reviews.map(r => ({ ...r, userName: r.userName || r.user?.name || 'Owner' })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/reviews/pending - all pending reviews (Admin)
router.get('/pending', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { status: 'PENDING' },
      include: { user: { select: { id: true, name: true, email: true } }, car: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/reviews - submit a review (Owner)
router.post('/', async (req, res) => {
  try {
    const { userId, carId, rating, comment, photo, userName } = req.body;

    const deliveredOrder = await prisma.order.findFirst({
      where: { userId, carId, status: 'DELIVERED' }
    });
    if (!deliveredOrder) {
      return res.status(403).json({ error: 'Only owners of this car can write a review' });
    }

    const existing = await prisma.review.findFirst({ where: { userId, carId } });

    const review = existing
      ? await prisma.review.update({
          where: { id: existing.id },
          data: { rating: parseInt(rating), comment, photo: photo || existing.photo, userName: userName || existing.userName, status: 'PENDING' }
        })
      : await prisma.review.create({
          data: { userId, carId, rating: parseInt(rating), comment, photo: photo || '', userName: userName || '', status: 'PENDING' }
        });

    res.status(201).json(review);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/reviews/:id/status - approve or reject (Admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const review = await prisma.review.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(review);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
