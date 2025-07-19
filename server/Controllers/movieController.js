import pool from '../db.js';
export const getFeatured = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies WHERE featured');
    console.log(result.rows)
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
