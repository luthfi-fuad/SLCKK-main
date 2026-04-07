import { Redis } from '@upstash/redis';

// Initialize Redis from Upstash environment variables
// These will be auto-populated in Vercel if the integration is connected.
// If Redis isn't configured, we fail gracefully.
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

export default async function handler(req, res) {
  // Setup CORS just in case
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { sessionId } = req.query;
  const bodySessionId = req.body?.sessionId;
  const id = sessionId || bodySessionId;

  if (!id) {
    return res.status(400).json({ error: 'sessionId is required' });
  }

  try {
    if (req.method === 'GET') {
      if (!redis) return res.json([]); // Graceful fallback if no DB
      const cart = await redis.get(`cart:${id}`);
      return res.status(200).json(cart || []);
    } 
    
    else if (req.method === 'POST') {
      if (!redis) return res.status(200).json({ success: true, warning: 'No Redis connected' });
      const { items } = req.body;
      if (!items) return res.status(400).json({ error: 'items required' });
      
      // Store cart for 7 days (604800 seconds)
      await redis.set(`cart:${id}`, items, { ex: 604800 });
      return res.status(200).json({ success: true });
    } 
    
    else if (req.method === 'DELETE') {
      if (!redis) return res.status(200).json({ success: true });
      await redis.del(`cart:${id}`);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Redis error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
}
