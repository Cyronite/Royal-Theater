const { Pool } = require('pg');

const pool = new Pool({
  user: 'cyronite',
  host: 'localhost',
  database: 'movie_booking',
  password: 'password',
  port: 5432,
});

module.exports = pool;
