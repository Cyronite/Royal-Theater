import pool from '../db.js';
export const getFeatured = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies WHERE featured');
    const movies = result.rows.map((row) => ({
      ...row,
      image: row.image ? Buffer.from(row.image).toString('base64') : null, 
    }));

    res.status(200).json(movies);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const getAllShows = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies');
    const movies = result.rows.map((row) => ({
      ...row,
      image: row.image ? Buffer.from(row.image).toString('base64') : null, 
    }));

    res.status(200).json(movies);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}