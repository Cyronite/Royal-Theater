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

export const getBookings = async (req, res) => {
  console.log("getBookings called with params:", req.params);
  const uid = req.params.uid; // Assuming userId comes from URL param

  try {
    const result = await pool.query(
      `
      SELECT
        b.id AS booking_id,
        b.num_tickets,
        b.booked_at,
        m.id,
        m.title,
        m.description,
        m.show_date,
        m.show_time,
        m.price,
        m.featured,
        m.numtickets,
        m.rating,
        m.image
      FROM bookings b
      JOIN movies m ON b.movie_id = m.id
      WHERE b.user_id = $1
      ORDER BY m.show_date ASC, m.show_time ASC
      `,
      [uid]
    );

   const plays = result.rows.map(row => ({
  bookingId: row.booking_id,
  date: row.show_date,
  time: row.show_time,
  numTickets: row.num_tickets,
  movie: {
    id: row.id,
    title: row.title,
    description: row.description,
    show_date: row.show_date,
    show_time: row.show_time,
    price: parseFloat(row.price),
    featured: row.featured,
    numtickets: row.numtickets,
    rating: parseFloat(row.rating),
    image: row.image ? Buffer.from(row.image).toString('base64') : null,
  },
}));

    res.status(200).json(plays);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
