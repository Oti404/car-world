const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ connectionString: process.env.DIRECT_URL });

const statements = [
  // Drop dependent tables first
  `DROP TABLE IF EXISTS "CartItem" CASCADE`,
  `DROP TABLE IF EXISTS "Review" CASCADE`,
  `DROP TABLE IF EXISTS "Order" CASCADE`,
  `DROP TABLE IF EXISTS "Car" CASCADE`,
  `DROP TABLE IF EXISTS "News" CASCADE`,
  `DROP TABLE IF EXISTS "ContactMessage" CASCADE`,

  // Update enums
  `DO $$ BEGIN ALTER TYPE "OrderStatus" ADD VALUE IF NOT EXISTS 'CANCELLED'; EXCEPTION WHEN others THEN NULL; END $$`,
  `DO $$ BEGIN ALTER TYPE "ReviewStatus" ADD VALUE IF NOT EXISTS 'REJECTED'; EXCEPTION WHEN others THEN NULL; END $$`,
  `DO $$ BEGIN
    CREATE TYPE "ContactStatus_new" AS ENUM ('NEW','READ','RESOLVED');
    ALTER TABLE IF EXISTS "ContactMessage" ALTER COLUMN "status" TYPE "ContactStatus_new" USING "status"::text::"ContactStatus_new";
    DROP TYPE IF EXISTS "ContactStatus";
    ALTER TYPE "ContactStatus_new" RENAME TO "ContactStatus";
  EXCEPTION WHEN others THEN NULL; END $$`,

  // Update User table — allow id to be provided (Firebase UID)
  `ALTER TABLE IF EXISTS "User" ALTER COLUMN "passwordHash" SET DEFAULT ''`,
  `ALTER TABLE IF EXISTS "User" ALTER COLUMN "id" DROP DEFAULT`,

  // Recreate Car with correct columns
  `CREATE TABLE "Car" (
    "id"          TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "name"        TEXT NOT NULL,
    "basePrice"   DOUBLE PRECISION NOT NULL,
    "stock"       INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT '',
    "engineSpecs" TEXT NOT NULL DEFAULT '',
    "images"      TEXT[] NOT NULL DEFAULT '{}',
    "options"     JSONB NOT NULL DEFAULT '{}',
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
  )`,

  // Recreate CartItem
  `CREATE TABLE "CartItem" (
    "id"              TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "configuration"   JSONB NOT NULL DEFAULT '{}',
    "calculatedPrice" DOUBLE PRECISION NOT NULL,
    "userId"          TEXT NOT NULL,
    "carId"           TEXT NOT NULL,
    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "CartItem_carId_fkey"  FOREIGN KEY ("carId")  REFERENCES "Car"("id")  ON DELETE CASCADE
  )`,

  // Recreate Order
  `CREATE TABLE "Order" (
    "id"             TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "orderDate"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status"         "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "totalAmount"    DOUBLE PRECISION NOT NULL,
    "assignedVin"    TEXT,
    "billingDetails" JSONB,
    "userId"         TEXT NOT NULL,
    "carId"          TEXT NOT NULL,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "Order_carId_fkey"  FOREIGN KEY ("carId")  REFERENCES "Car"("id")  ON DELETE CASCADE
  )`,

  // Recreate Review
  `CREATE TABLE "Review" (
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

  // Create News
  `CREATE TABLE "News" (
    "id"        TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "title"     TEXT NOT NULL,
    "image"     TEXT NOT NULL DEFAULT '',
    "imageAlt"  TEXT NOT NULL DEFAULT '',
    "content"   TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
  )`,

  // Recreate ContactMessage with name + email for guests
  `CREATE TABLE "ContactMessage" (
    "id"        TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "name"      TEXT NOT NULL DEFAULT '',
    "email"     TEXT NOT NULL DEFAULT '',
    "subject"   TEXT NOT NULL,
    "message"   TEXT NOT NULL,
    "status"    "ContactStatus" NOT NULL DEFAULT 'NEW',
    "userId"    TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "ContactMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL
  )`
];

async function migrate() {
  await client.connect();
  console.log('Connected. Running migration...\n');
  for (const stmt of statements) {
    const label = stmt.replace(/\s+/g, ' ').substring(0, 80);
    try {
      await client.query(stmt);
      console.log('OK >', label);
    } catch (e) {
      console.error('ERR>', label);
      console.error('    ', e.message);
    }
  }
  await client.end();
  console.log('\nMigration done.');
}

migrate().catch(console.error);
