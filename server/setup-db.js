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
    console.log(`Table ${tableName} exists: ${exists}`);
    return exists;
  } catch (err) {
    console.error('Error checking table existence:', err);
    return false;
  }
}

async function setup() {
  try {
    // Drop tables in correct order (because of foreign key constraints)
    await pool.query(`
      DROP TABLE IF EXISTS bookings CASCADE;
      DROP TABLE IF EXISTS movies CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);
    console.log('✅ Existing tables dropped');

    // Create tables in correct order
    await pool.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
    
    // Create users table
    await pool.query(`
      CREATE TABLE users (
        uid TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Users table created');

    // Create movies table
    await pool.query(`
      CREATE TABLE movies (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        show_date DATE NOT NULL,
        show_time TIME NOT NULL,
        price NUMERIC(6, 2) NOT NULL,
        image BYTEA,
        featured BOOLEAN DEFAULT false,
        available BOOLEAN DEFAULT true,
        rating NUMERIC(2, 1) CHECK (rating >= 0 AND rating <= 5)
      );
    `);
    console.log('✅ Movies table created');

    // Create bookings table
    await pool.query(`
      CREATE TABLE bookings (
        id SERIAL PRIMARY KEY,
        user_id TEXT REFERENCES users(uid),
        movie_id INTEGER REFERENCES movies(id),
        num_tickets INTEGER NOT NULL CHECK (num_tickets > 0),
        booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Bookings table created');

    // Insert test data
    if (await doesTableExist('movies')) {
      try {
        for (const play of plays) {
          const imageBuffer = fs.readFileSync(play.imagePath);
          const res = await pool.query(
            `INSERT INTO movies (
              title, description, show_date, show_time, price, 
              image, featured, available, rating
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING id`,
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
          console.log(`✅ Inserted play: ${play.title} with ID: ${res.rows[0].id}`);
        }
      } catch (err) {
        console.error('❌ Error inserting plays:', err);
        throw err; // Rethrow to trigger the catch block
      }
    }

    console.log('✅ Database setup completed successfully');
  } catch (err) {
    console.error('❌ Error during setup:', err);
  } finally {
    await pool.end();
    console.log('Database connection closed');
  }
}

setup();
