import express from 'express';
import {getFeatured, getAllShows} from '../Controllers/movieController.js'

const router = express.Router();


router.get('/featured', getFeatured);
router.get('/', getAllShows)

export default router;