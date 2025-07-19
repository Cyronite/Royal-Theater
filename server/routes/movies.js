import express from 'express';
import {getFeatured} from '../Controllers/movieController.js'

const router = express.Router();


router.get('/featured', getFeatured);


export default router;