#!/bin/bash
set -e

mkdir -p "$PGDATA" "$UPLOAD_DIR"
chown -R postgres:postgres "$PGDATA"

# First run: initialise the database cluster, user and database
if [ ! -s "$PGDATA/PG_VERSION" ]; then
  echo "Initialising PostgreSQL in $PGDATA..."
  su postgres -c "$PG_BIN/initdb -D $PGDATA --auth=trust --encoding=UTF8 >/dev/null"
  su postgres -c "$PG_BIN/pg_ctl -D $PGDATA -o \"-c listen_addresses=localhost\" -w start >/dev/null"
  su postgres -c "psql -q -c \"CREATE USER mhp WITH PASSWORD 'mhp';\""
  su postgres -c "psql -q -c \"CREATE DATABASE mhp OWNER mhp;\""
else
  su postgres -c "$PG_BIN/pg_ctl -D $PGDATA -o \"-c listen_addresses=localhost\" -w start >/dev/null"
fi
echo "PostgreSQL started."

stop_all() {
  echo "Shutting down..."
  [ -n "$NODE_PID" ] && kill -TERM "$NODE_PID" 2>/dev/null && wait "$NODE_PID"
  su postgres -c "$PG_BIN/pg_ctl -D $PGDATA -m fast -w stop >/dev/null"
  exit 0
}
trap stop_all TERM INT

# Sync schema and seed demo data (both are idempotent)
npx prisma db push --skip-generate
node seed.js

node index.js &
NODE_PID=$!
wait "$NODE_PID"
