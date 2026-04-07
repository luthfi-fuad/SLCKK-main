require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Ensure the data directory exists (maps to docker volume)
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Set up SQLite database in persistent volume
const dbPath = path.join(dataDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Connected to SQLite database.');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS carts (
      sessionId TEXT PRIMARY KEY,
      items TEXT NOT NULL,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Helper to interact with DB
const getCartStr = (sessionId) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT items FROM carts WHERE sessionId = ?', [sessionId], (err, row) => {
      if (err) reject(err);
      else resolve(row ? row.items : '[]');
    });
  });
};

const saveCartStr = (sessionId, itemsStr) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO carts (sessionId, items, updatedAt) VALUES (?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(sessionId) DO UPDATE SET items = ?, updatedAt = CURRENT_TIMESTAMP`,
      [sessionId, itemsStr, itemsStr],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      }
    );
  });
};

// API: Get Cart
app.get('/api/cart', async (req, res) => {
  const sessionId = req.query.sessionId;
  if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

  try {
    const itemsStr = await getCartStr(sessionId);
    res.json(JSON.parse(itemsStr));
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// API: Update Cart
app.post('/api/cart', async (req, res) => {
  const { sessionId, items } = req.body;
  if (!sessionId || !items) return res.status(400).json({ error: 'sessionId and items required' });

  try {
    await saveCartStr(sessionId, JSON.stringify(items));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// API: Clear Cart
app.delete('/api/cart', async (req, res) => {
  const sessionId = req.query.sessionId;
  if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

  try {
    await saveCartStr(sessionId, '[]');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// API: Stripe Checkout API
app.post('/api/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  try {
    // Note: In production, never trust frontend prices. Always verify against DB product list.
    const lineItems = items.map((cartItem) => {
      // Stripe only accepts fully-qualified https:// URLs for images.
      // Local paths like /images/... are filtered out to prevent "Not a valid URL" errors.
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
          unit_amount: Math.round(cartItem.product.price * 100), // Stripe expects cents
        },
        quantity: cartItem.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
