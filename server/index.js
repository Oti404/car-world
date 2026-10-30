const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users',   require('./routes/users'));
app.use('/api/cars',    require('./routes/cars'));
app.use('/api/orders',  require('./routes/orders'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/cart',    require('./routes/cart'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/news',    require('./routes/news'));

const uploads = require('./routes/uploads');
app.use('/api/uploads', uploads.router);
app.use('/uploads', express.static(uploads.UPLOAD_DIR));

app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected' });
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const shutdown = async () => { await prisma.$disconnect(); process.exit(0); };
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
