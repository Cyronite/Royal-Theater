import express from 'express';
import {getFeatured, getAllShows, getBookings} from '../Controllers/movieController.js'

const router = express.Router();


router.get('/featured', getFeatured);
router.get('/', getAllShows)
router.get('/bookings/:uid', getBookings)

export default router;