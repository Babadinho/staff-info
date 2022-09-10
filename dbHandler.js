const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

console.log(connectionString);

const pool = new Pool({
  connectionString,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

module.exports = pool;
