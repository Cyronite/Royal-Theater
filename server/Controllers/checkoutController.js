import dotenv from 'dotenv';
import Stripe from 'stripe';
import pool from '../db.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SK, {
  apiVersion: '2022-11-15',
});

export const createCheckoutSession = async (req, res) => {
  try {
    const { playId, numtickets, uid } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1RrTKXPVYDJualBmutGBLoy3',
          quantity: 1,
            adjustable_quantity: {
                enabled: true,
                minimum: 1,
                maximum: numtickets,
            },
        },
      ],
      
      mode: 'payment',
      metadata: {
        playId: playId,
        numtickets: numtickets.toString(),
        uid: uid,
      },
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Checkout session creation failed:", error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
const processedBookings = [];

export const confirmBooking = async (req, res) => {
  const { sessionId } = req.body;

  if (processedBookings.includes(sessionId)) {
    return res.status(400).send('Booking already processed');
  }
  processedBookings.push(sessionId);

  try {
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Retrieve line items to get actual quantity
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 1 });
    const purchasedQuantity = lineItems.data[0]?.quantity ?? 1; // fallback 1 if undefined

    const { playId, uid } = session.metadata;

    // Insert using actual purchased quantity from Stripe line items
    await pool.query(
      'INSERT INTO bookings (user_id, movie_id, num_tickets) VALUES ($1, $2, $3)',
      [uid, playId, purchasedQuantity]
    );

    res.status(200).send('Booking confirmed');
  } catch (err) {
    console.error('Failed to confirm booking:', err);
    res.status(500).send('Server error');
  }
};
