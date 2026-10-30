const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/contact (Admin)
router.get('/', async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/contact (Guest or Customer)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, userId } = req.body;
    const msg = await prisma.contactMessage.create({
      data: { name: name || '', email: email || '', subject, message, userId: userId || null }
    });
    res.status(201).json(msg);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/contact/:id/status (Admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const msg = await prisma.contactMessage.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(msg);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
