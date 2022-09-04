const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

module.exports = pool;
