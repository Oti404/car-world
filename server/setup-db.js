const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ connectionString: process.env.DIRECT_URL });

const statements = [
  `DO $$ BEGIN CREATE TYPE "Role" AS ENUM ('GUEST','CUSTOMER','OWNER','ADMIN'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `DO $$ BEGIN CREATE TYPE "OrderStatus" AS ENUM ('PENDING','PAID','DELIVERED'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `DO $$ BEGIN CREATE TYPE "ReviewStatus" AS ENUM ('PENDING','APPROVED'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `DO $$ BEGIN CREATE TYPE "ContactStatus" AS ENUM ('NEW','RESOLVED'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `CREATE TABLE IF NOT EXISTS "User" (
    "id"           TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "name"         TEXT NOT NULL,
    "email"        TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role"         "Role" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`,
  `CREATE TABLE IF NOT EXISTS "Car" (
    "id"          TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "modelName"   TEXT NOT NULL,
    "engine"      TEXT NOT NULL,
    "basePrice"   DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "imageUrl"    TEXT,
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE TABLE IF NOT EXISTS "CartItem" (
    "id"              TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "configuration"   JSONB NOT NULL DEFAULT '{}',
    "calculatedPrice" DOUBLE PRECISION NOT NULL,
    "userId"          TEXT NOT NULL,
    "carId"           TEXT NOT NULL,
    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "CartItem_carId_fkey"  FOREIGN KEY ("carId")  REFERENCES "Car"("id")  ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS "Order" (
    "id"          TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "orderDate"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status"      "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "assignedVin" TEXT,
    "userId"      TEXT NOT NULL,
    "carId"       TEXT NOT NULL,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "Order_carId_fkey"  FOREIGN KEY ("carId")  REFERENCES "Car"("id")  ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS "Review" (
    "id"        TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "rating"    INTEGER NOT NULL,
    "comment"   TEXT NOT NULL,
    "status"    "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "userId"    TEXT NOT NULL,
    "carId"     TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "Review_carId_fkey"  FOREIGN KEY ("carId")  REFERENCES "Car"("id")  ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id"        TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "subject"   TEXT NOT NULL,
    "message"   TEXT NOT NULL,
    "status"    "ContactStatus" NOT NULL DEFAULT 'NEW',
    "userId"    TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "ContactMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL
  )`
];

async function setup() {
  await client.connect();
  console.log('Connected. Creating schema...\n');
  for (const stmt of statements) {
    const label = stmt.replace(/\s+/g, ' ').substring(0, 70);
    try {
      await client.query(stmt);
      console.log('OK >', label);
    } catch (e) {
      console.error('ERR>', label);
      console.error('    ', e.message);
    }
  }
  await client.end();
  console.log('\nDone.');
}

setup().catch(console.error);
