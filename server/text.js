const pool = require('./db'); // your db.js file

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Connected to PostgreSQL at:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
  } finally {
    await pool.end(); // clean up
  }
}

testConnection();