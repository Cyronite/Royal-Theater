import pool from './db.js';
import fs from 'fs';

const plays = [
  {
    title: 'Romeo and Juliet',
    description: 'A classic Shakespearean tragedy about star-crossed lovers.',
    show_date: '2025-08-01',
    show_time: '19:00:00',
    price: 25.00,
    imagePath: './images/romeo.jpg',
    featured: true,
    available: false,
    rating: 5.0
  },
  {
    title: 'Macbeth',
    description: 'A gripping tale of ambition and fate.',
    show_date: '2025-08-02',
    show_time: '20:00:00',
    price: 30.00,
    imagePath: './images/macbeth.jpg',
    featured: false,
    available: true,
    rating: 4.3
  },
  {
    title: "A Midsummer Night's Dream",
    description: 'A magical comedy of love and mischief.',
    show_date: '2025-08-03',
    show_time: '18:30:00',
    price: 20.00,
    imagePath: './images/midsummer.jpg',
    featured: true,
    available: true,
    rating: 4.6
  },
  {
    title: 'Hamlet',
    description: 'The prince of Denmark seeks revenge in this iconic drama.',
    show_date: '2025-08-04',
    show_time: '19:30:00',
    price: 28.00,
    imagePath: './images/hamlet.jpg',
    featured: true,
    available: true,
    rating: 4.8
  },
  {
    title: 'Othello',
    description: 'A tragic story of jealousy and deception.',
    show_date: '2025-08-05',
    show_time: '20:00:00',
    price: 27.50,
    imagePath: './images/othello.jpg',
    featured: false,
    available: false,
    rating: 3.9
  }
];

async function doesTableExist(tableName) {
  try {
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = $1
      );
    `, [tableName]);

    const exists = result.rows[0].exists;
    console.log(`DOES IT EXIST: ${exists}`);
    return exists;
  } catch (err) {
    console.error('Error checking table existence:', err);
    return false;
  }
}

async function setup() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        show_date DATE NOT NULL,
        show_time TIME NOT NULL,
        price NUMERIC(6, 2) NOT NULL,
        image BYTEA,
        featured BOOLEAN,
        available BOOLEAN,
        rating NUMERIC(2, 1) CHECK (rating >= 0 AND rating <= 5)
      );
    `);
    console.log('✅ movies table created');
  } catch (err) {
    console.error('❌ Error creating table:', err);
  }

  if (await doesTableExist('movies')) {
    try {
      for (const play of plays) {
        const imageBuffer = fs.readFileSync(play.imagePath);
        const res = await pool.query(
          `INSERT INTO movies (
            title, description, show_date, show_time, price, image, featured, available, rating
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
          [
            play.title,
            play.description,
            play.show_date,
            play.show_time,
            play.price,
            imageBuffer,
            play.featured,
            play.available,
            play.rating
          ]
        );
        console.log(`Inserted play with ID: ${res.rows[0].id}`);
      }
    } catch (err) {
      console.error('Error inserting plays:', err);
    } finally {
      await pool.end();
    }
  }
}

setup();
