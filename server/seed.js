// Idempotent seed used by the Docker entrypoint: fills an empty database
// with the demo cars, news articles and a default admin account.
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
dotenv.config();

const cars = require('./seed-cars');
const news = require('./seed-news');
const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@mhp.local';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (!(await prisma.user.findUnique({ where: { email: adminEmail } }))) {
    await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Administrator',
        email: adminEmail,
        passwordHash: await bcrypt.hash(adminPassword, 10),
        role: 'ADMIN'
      }
    });
    console.log(`Admin account created: ${adminEmail}`);
  }

  if ((await prisma.car.count()) === 0) {
    for (const car of cars) await prisma.car.create({ data: car });
    console.log(`Seeded ${cars.length} cars`);
  }

  if ((await prisma.news.count()) === 0) {
    for (const article of news) await prisma.news.create({ data: article });
    console.log(`Seeded ${news.length} news articles`);
  }
}

main()
  .catch(e => { console.error('Seed failed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
