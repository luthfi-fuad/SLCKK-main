import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { items } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  try {
    const lineItems = items.map((cartItem) => {
      // Filter out local image paths, Stripe only accepts https
      const publicImages = (cartItem.product.images || []).filter(
        (img) => typeof img === 'string' && img.startsWith('https://')
      );

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${cartItem.product.name} - ${cartItem.size} / ${cartItem.color}`,
            ...(publicImages.length > 0 && { images: [publicImages[0]] }),
          },
          unit_amount: Math.round(cartItem.product.price * 100),
        },
        quantity: cartItem.quantity,
      };
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: error.message });
  }
}
