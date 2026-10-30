const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Test the DIRECT_URL
const connectionString = process.env.DIRECT_URL;

console.log('Testing connection to:', connectionString.split('@')[1]); // Log host part only for safety

const client = new Client({
  connectionString: connectionString,
});

client.connect()
  .then(() => {
    console.log('CONNECTED SUCCESSFULLY!');
    return client.query('SELECT NOW()');
  })
  .then(res => {
    console.log('Server time:', res.rows[0]);
    return client.end();
  })
  .catch(err => {
    console.error('CONNECTION FAILED:');
    console.error(err.message);
    if (err.code) console.error('Error Code:', err.code);
    process.exit(1);
  });
