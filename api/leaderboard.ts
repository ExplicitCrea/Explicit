import { Redis } from '@upstash/redis';

export interface LeaderboardEntry {
  id: string;
  pseudo: string;
  score: number;
  ip: string;
  date: string;
}

// Support des variables d'environnement Vercel KV, Upstash Redis et STORAGE_*
function getRedisClient(): Redis | null {
  const url = 
    process.env.KV_REST_API_URL || 
    process.env.STORAGE_REST_API_URL || 
    process.env.UPSTASH_REDIS_REST_URL;

  const token = 
    process.env.KV_REST_API_TOKEN || 
    process.env.STORAGE_REST_API_TOKEN || 
    process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

const REDIS_KEY = 'explicit_snake_leaderboard';

export default async function handler(req: any, res: any) {
  // En-têtes CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const redis = getRedisClient();

  // 1. Récupération des meilleurs scores
  if (req.method === 'GET') {
    if (!redis) {
      return res.status(200).json({
        leaderboard: [],
        configured: false,
        message: 'Base de données non configurée sur le serveur. Définissez KV_REST_API_URL / KV_REST_API_TOKEN dans Vercel.',
      });
    }

    try {
      const data = await redis.get<LeaderboardEntry[]>(REDIS_KEY);
      const list = Array.isArray(data) ? data : [];
      return res.status(200).json({
        leaderboard: list.slice(0, 5),
        configured: true,
      });
    } catch (error) {
      console.error('Erreur lecture leaderboard serveur:', error);
      return res.status(500).json({ error: 'Erreur serveur lors de la récupération des scores' });
    }
  }

  // 2. Enregistrement d'un nouveau score
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { pseudo, score } = body || {};

      if (!pseudo || typeof score !== 'number' || score < 0) {
        return res.status(400).json({ error: 'Données invalides : pseudo et score requis' });
      }

      const cleanPseudo = String(pseudo).trim().toUpperCase().slice(0, 3) || 'EXP';

      // Récupération de l'adresse IP client
      const rawIp = 
        req.headers['x-forwarded-for'] || 
        req.headers['x-real-ip'] || 
        req.socket?.remoteAddress || 
        '127.0.0.1';
      const clientIp = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : '127.0.0.1';

      const newEntry: LeaderboardEntry = {
        id: Date.now().toString(),
        pseudo: cleanPseudo,
        score: Math.floor(score),
        ip: clientIp,
        date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      };

      if (!redis) {
        return res.status(200).json({
          success: true,
          configured: false,
          saved: false,
          message: 'Base non configurée. Score non persisté sur le serveur.',
          entry: newEntry,
          leaderboard: [newEntry],
        });
      }

      // Lecture, insertion, tri descendant et conservation du top 100
      const current = await redis.get<LeaderboardEntry[]>(REDIS_KEY);
      const list = Array.isArray(current) ? current : [];

      const updated = [...list, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 100);

      await redis.set(REDIS_KEY, updated);

      return res.status(200).json({
        success: true,
        configured: true,
        saved: true,
        entry: newEntry,
        leaderboard: updated.slice(0, 5),
      });
    } catch (error) {
      console.error('Erreur enregistrement score serveur:', error);
      return res.status(500).json({ error: 'Erreur serveur lors de l\'enregistrement du score' });
    }
  }

  return res.status(405).json({ error: 'Méthode non autorisée' });
}
