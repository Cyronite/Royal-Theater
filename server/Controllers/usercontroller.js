import pool from '../db.js';

export const signup = async (req, res) => {
    const { uid, name } = req.body;
    if (!uid || !name) {
        return res.status(400).json({ 
            error: 'Missing required fields' 
        });
    }
    try {
        // Check if user already exists
        const existing = await pool.query('SELECT * FROM users WHERE uid = $1', [uid]);
        if (existing.rows.length > 0) {
            return res.status(409).json({
                error: 'User already exists',
                user: existing.rows[0]
            });
        }

        // Insert new user
        const result = await pool.query(
            'INSERT INTO users (uid, name) VALUES ($1, $2) RETURNING *',
            [uid, name]
        );
        res.status(201).json({ 
            message: 'User created successfully',
            user: result.rows[0]
        });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ 
            error: 'Failed to create user',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

export const signin = async (req, res) => {
    const {uid} = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE uid = $1', [uid]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error('Error during signin:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
