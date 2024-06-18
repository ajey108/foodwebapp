import Stripe from "stripe";
import express from "express";
import { config } from "dotenv";

config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Route to create a Stripe checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { products, customerEmail } = req.body;

  const lineItems = products.map(product => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: product.name
      },
      unit_amount: product.priceInCents
    },
    quantity: product.quantity
  }));

  const productDetailsSerialized = JSON.stringify(products.map(product => ({
    name: product.name,
    quantity: product.quantity,
    price: product.priceInCents
  })));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      metadata: { productDetails: productDetailsSerialized },
      mode: 'payment',
      customer_email: customerEmail,
      billing_address_collection: 'required',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`
    });

    res.json({ id: session.id });
  } catch (error) {
    console.log('Failed to create checkout session:', error.message);
    res.status(400).json({ message: 'Error creating checkout session' });
  }
});

export default router;
