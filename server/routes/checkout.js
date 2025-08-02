import { createCheckoutSession,confirmBooking } from '../Controllers/checkoutController.js';
import express from 'express';
const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
router.post('/confirmbooking', confirmBooking);

export default router;