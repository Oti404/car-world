const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const publicFields = { id: true, name: true, email: true, role: true, createdAt: true };

const signToken = (user) => jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    req.userId = jwt.verify(token, JWT_SECRET).sub;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: 'An account with this email already exists' });

    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: name || email,
        email,
        passwordHash: await bcrypt.hash(password, 10),
        role: 'CUSTOMER'
      },
      select: publicFields
    });
    res.status(201).json({ token: signToken(user), user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email || '' } });
    if (!user || !user.passwordHash || !(await bcrypt.compare(password || '', user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const { passwordHash, updatedAt, ...publicUser } = user;
    res.json({ token: signToken(user), user: publicUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/users/me — current user from token
router.get('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId }, select: publicFields });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// PUT /api/users/me — update own name
router.put('/me', requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { name: req.body.name },
      select: publicFields
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/users/:id — get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: publicFields
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/users — all users (Admin)
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: publicFields });
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/users/:id/role — update role (Admin)
router.put('/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: { id: true, name: true, email: true, role: true }
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
