const { Pool } = require('pg');

// const connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`;

// const isProduction = process.env.NODE_ENV === 'production';

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: {
//     require: true,
//     rejectUnauthorized: false,
//   },
// });

const pool = new Pool({
  host: 'ec2-3-219-19-205.compute-1.amazonaws.com',
  user: 'mcgxmwfsvwutzh',
  database: 'dbrh2bh3dpns8q',
  password: 'cadc5356dc0d0ff7c30ba660d848a69f7bca66ab6ec613c967dab7093a9187f5',
  port: '5432',
});

module.exports = pool;
