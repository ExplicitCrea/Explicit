import { Redis } from '@upstash/redis';
import { createHash } from 'crypto';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  id: string;
  pseudo: string;
  score: number;
  date: string;
  // ip est délibérément absent : jamais exposé au client (RGPD)
}

/** Structure interne stockée dans Redis — l'IP hashée n'est jamais retournée */
interface InternalEntry extends LeaderboardEntry {
  ipHash: string;
}

// ─── Config ──────────────────────────────────────────────────────────────────

/** Score maximum théorique : grille 16×16 = 256 cases, serpent démarre à 3 */
const MAX_SCORE = 256;
const MIN_SCORE = 1;
const LEADERBOARD_KEY = 'explicit_snake_leaderboard';
const RATE_LIMIT_PREFIX = 'ratelimit:leaderboard:';
const RATE_LIMIT_MAX = 5;       // soumissions max par heure par IP
const RATE_LIMIT_WINDOW = 3600; // secondes (1 heure)

/** Origines autorisées pour CORS */
const ALLOWED_ORIGINS = [
  'https://www.explicitcrea.com',
  'https://explicitcrea.com',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getRedisClient(): Redis | null {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.STORAGE_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL;

  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.STORAGE_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** Hash l'IP avec un sel secret pour le rate-limiting — jamais stocké en clair */
function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || 'explicit-default-salt-change-me';
  return createHash('sha256').update(ip + salt).digest('hex').slice(0, 16);
}

/** Extrait l'IP réelle depuis les headers Vercel */
function extractClientIp(req: any): string {
  const raw =
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    '127.0.0.1';
  return typeof raw === 'string' ? raw.split(',')[0].trim() : '127.0.0.1';
}

/** Retire l'ipHash avant d'envoyer au client */
function toPublicEntry(entry: InternalEntry): LeaderboardEntry {
  const { ipHash: _removed, ...publicEntry } = entry;
  return publicEntry;
}

// ─── Handler principal ────────────────────────────────────────────────────────

export default async function handler(req: any, res: any) {
  // ── CORS restreint aux domaines autorisés ──
  const origin = req.headers.origin as string | undefined;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const redis = getRedisClient();

  // ──────────────────────────────────────────────────────────────────────────
  // GET — Récupération du classement public (sans IP)
  // ──────────────────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    if (!redis) {
      return res.status(200).json({
        leaderboard: [],
        configured: false,
        message: 'Base de données non configurée. Définissez KV_REST_API_URL / KV_REST_API_TOKEN dans Vercel.',
      });
    }

    try {
      const data = await redis.get<InternalEntry[]>(LEADERBOARD_KEY);
      const list = Array.isArray(data) ? data : [];
      return res.status(200).json({
        leaderboard: list.slice(0, 5).map(toPublicEntry),
        configured: true,
      });
    } catch (error) {
      console.error('Erreur lecture leaderboard:', error);
      return res.status(500).json({ error: 'Erreur serveur lors de la récupération des scores' });
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // POST — Enregistrement d'un score avec validation stricte + rate limiting
  // ──────────────────────────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const clientIp = extractClientIp(req);
    const clientIpHash = hashIp(clientIp);

    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { pseudo, score } = body || {};

      // ── Validation stricte du score ──
      if (
        !pseudo ||
        typeof score !== 'number' ||
        !Number.isInteger(score) ||
        score < MIN_SCORE ||
        score > MAX_SCORE
      ) {
        return res.status(400).json({
          error: `Données invalides : pseudo requis et score entier entre ${MIN_SCORE} et ${MAX_SCORE}`,
        });
      }

      const cleanPseudo = String(pseudo).trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3) || 'EXP';

      // ── Rate limiting par IP hashée ──
      if (redis) {
        const rateLimitKey = `${RATE_LIMIT_PREFIX}${clientIpHash}`;
        const submissions = await redis.incr(rateLimitKey);
        if (submissions === 1) {
          await redis.expire(rateLimitKey, RATE_LIMIT_WINDOW);
        }
        if (submissions > RATE_LIMIT_MAX) {
          return res.status(429).json({
            error: `Trop de soumissions. Réessayez dans 1 heure. (max ${RATE_LIMIT_MAX}/heure)`,
          });
        }
      }

      const newEntry: InternalEntry = {
        id: Date.now().toString(),
        pseudo: cleanPseudo,
        score: Math.floor(score),
        ipHash: clientIpHash, // stocké uniquement en interne, jamais exposé
        date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      };

      if (!redis) {
        return res.status(200).json({
          success: true,
          configured: false,
          saved: false,
          message: 'Base non configurée. Score non persisté.',
          entry: toPublicEntry(newEntry),
          leaderboard: [toPublicEntry(newEntry)],
        });
      }

      // Lecture, insertion, tri descendant et conservation du top 100
      const current = await redis.get<InternalEntry[]>(LEADERBOARD_KEY);
      const list = Array.isArray(current) ? current : [];

      const updated = [...list, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 100);

      await redis.set(LEADERBOARD_KEY, updated);

      return res.status(200).json({
        success: true,
        configured: true,
        saved: true,
        entry: toPublicEntry(newEntry),
        leaderboard: updated.slice(0, 5).map(toPublicEntry),
      });
    } catch (error) {
      console.error('Erreur enregistrement score:', error);
      return res.status(500).json({ error: "Erreur serveur lors de l'enregistrement du score" });
    }
  }

  return res.status(405).json({ error: 'Méthode non autorisée' });
}
