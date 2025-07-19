import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'cyronite',
  host: 'localhost',
  database: 'movie_booking',
  password: 'password',
  port: 5432,
});

export default pool;
