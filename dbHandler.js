const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`;

const isProduction = process.env.NODE_ENV === 'production';

if (connectionString) {
  console.log('Connected locally');
} else if (isProduction) {
  console.log('Connected in producton');
}

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

// const pool = new Pool({
//   host: 'localhost',
//   user: process.env.USER,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
// });

module.exports = pool;
