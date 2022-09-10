const { Pool } = require('pg');

const connectionString =
  'postgres://vqlzztvvbevxbe:843f6ff5886f290fcd8d2b9e9028b8815f5a954b6213c7d429f300bcfae2699d@ec2-63-32-248-14.eu-west-1.compute.amazonaws.com:5432/dbvdud00nom7b1';

const pool = new Pool({
  connectionString,
});

module.exports = pool;
