import express from 'express';
import { getUsers, createUser } from '../controllers/userController.js';

const router = express.Router();

// Route to get all users
router.get('/', getUsers);

// Route to create a userjdamn 
router.post('/', createUser);

export default router;