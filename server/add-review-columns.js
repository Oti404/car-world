const { Client } = require('pg');
require('dotenv').config();

const DIRECT_URL = process.env.DIRECT_URL;

async function run() {
  const client = new Client({ connectionString: DIRECT_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();
  console.log('Connected.');

  const statements = [
    `ALTER TABLE "Review" ADD COLUMN IF NOT EXISTS "photo" TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE "Review" ADD COLUMN IF NOT EXISTS "userName" TEXT NOT NULL DEFAULT ''`,
  ];

  for (const sql of statements) {
    try {
      await client.query(sql);
      console.log('OK:', sql);
    } catch (e) {
      console.error('ERR:', e.message);
    }
  }

  await client.end();
  console.log('Done.');
}

run().catch(console.error);
