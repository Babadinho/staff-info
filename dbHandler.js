const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`;

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  // ssl: {
  //   require: true,
  //   rejectUnauthorized: false,
  // },
});

module.exports = pool;
