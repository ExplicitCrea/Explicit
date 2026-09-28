import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACTIVE_THEME } from '../../config/themes';
import ScrollReveal from '../../components/ScrollReveal';
import './SnakePage.css';

// Dimensions du damier (taille plus compacte)
const GRID_SIZE = 16;
const CELL_SIZE = 22;
const BOARD_SIZE = GRID_SIZE * CELL_SIZE; // 352px

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
interface Point {
  x: number;
  y: number;
}

const OPPOSITES: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

export interface LeaderboardEntry {
  id: string;
  pseudo: string;
  score: number;
  date: string;
}

export const SnakePage: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // États du jeu
  const [snake, setSnake] = useState<Point[]>([
    { x: 7, y: 8 },
    { x: 6, y: 8 },
    { x: 5, y: 8 },
  ]);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [food, setFood] = useState<Point>({ x: 12, y: 8 });
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // Leaderboard (stockage serveur)
  const [pseudoInput, setPseudoInput] = useState<string>('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [scoreSaved, setScoreSaved] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // File d'attente des entrées clavier & dernière direction physique (évite le suicide lors de l'appui simultané/rapide de 2 touches)
  const lastMovedDirRef = useRef<Direction>('RIGHT');
  const inputQueueRef = useRef<Direction[]>([]);

  // 1. Récupération des données et du classement en ligne depuis le serveur
  // 1. Chargement du leaderboard depuis l'API serveur avec fallback local
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.leaderboard)) {
            setLeaderboard(data.leaderboard);
            if (data.leaderboard.length > 0) {
              setBestScore(Math.max(...data.leaderboard.map((e: LeaderboardEntry) => e.score)));
            }
            localStorage.setItem('explicit_snake_leaderboard', JSON.stringify(data.leaderboard));
            return;
          }
        }
      } catch (e) {
        console.warn('API serveur indisponible, utilisation du cache local :', e);
      }

      // Fallback sur le cache localStorage
      const saved = localStorage.getItem('explicit_snake_leaderboard');
      if (saved) {
        try {
          const parsed: LeaderboardEntry[] = JSON.parse(saved);
          setLeaderboard(parsed);
          if (parsed.length > 0) {
            setBestScore(Math.max(...parsed.map((e) => e.score)));
          }
        } catch (e) {
          console.error('Erreur lecture fallback leaderboard', e);
        }
      }
    };

    fetchLeaderboard();
  }, []);


  // Génération de nourriture aléatoire hors du serpent
  const spawnFood = useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = currentSnake.some((seg) => seg.x === newFood.x && seg.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  // Démarrer une nouvelle partie
  const restartGame = () => {
    const initialSnake = [
      { x: 7, y: 8 },
      { x: 6, y: 8 },
      { x: 5, y: 8 },
    ];
    setSnake(initialSnake);
    setDirection('RIGHT');
    lastMovedDirRef.current = 'RIGHT';
    inputQueueRef.current = [];
    setFood(spawnFood(initialSnake));
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    setScoreSaved(false);
    setPseudoInput('');
  };

  // Gestion des contrôles clavier avec file d'attente (résout les appuis rapides/simultanés)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ' && gameStarted && !gameOver) {
        setIsPaused((p) => !p);
        return;
      }

      if (!gameStarted || gameOver || isPaused) return;

      let requestedDir: Direction | null = null;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'z') {
        requestedDir = 'UP';
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        requestedDir = 'DOWN';
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'q') {
        requestedDir = 'LEFT';
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        requestedDir = 'RIGHT';
      }

      if (requestedDir) {
        const queue = inputQueueRef.current;
        // Direction de référence : la dernière enregistrée dans la file ou la dernière direction appliquée
        const lastRefDir = queue.length > 0 ? queue[queue.length - 1] : lastMovedDirRef.current;

        // Empêche le demi-tour (180°) et les doublons, et autorise au maximum 2 commandes d'avance
        if (requestedDir !== lastRefDir && requestedDir !== OPPOSITES[lastRefDir] && queue.length < 2) {
          queue.push(requestedDir);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, isPaused]);

  // Boucle de jeu (Tick) - Vitesse ralentie à 145ms pour une meilleure jouabilité
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const interval = setInterval(() => {
      // Dépiler la prochaine direction demandée ou continuer tout droit
      let nextDir = lastMovedDirRef.current;
      if (inputQueueRef.current.length > 0) {
        nextDir = inputQueueRef.current.shift()!;
      }
      lastMovedDirRef.current = nextDir;
      setDirection(nextDir);

      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };

        switch (nextDir) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        // Collision avec les murs
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Collision avec soi-même
        if (prevSnake.some((seg) => seg.x === head.x && seg.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Manger la pomme
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => {
            const nextScore = s + 1;
            if (nextScore > bestScore) setBestScore(nextScore);
            return nextScore;
          });
          setFood(spawnFood(newSnake));
        } else {
          newSnake.pop(); // Avancer
        }

        return newSnake;
      });
    }, 145);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isPaused, food, bestScore, spawnFood]);

  // Rendu Canvas style Google Snake
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Fond en damier Google Snake (2 teintes subtiles)
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        ctx.fillStyle = (r + c) % 2 === 0 ? '#15181f' : '#1a1d26';
        ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    // 2. Dessin de la Pomme
    const appleX = food.x * CELL_SIZE + CELL_SIZE / 2;
    const appleY = food.y * CELL_SIZE + CELL_SIZE / 2;
    const appleRadius = CELL_SIZE * 0.4;

    ctx.save();
    // Corps de la pomme
    ctx.beginPath();
    ctx.arc(appleX, appleY, appleRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ff3344';
    ctx.shadowColor = 'rgba(255, 51, 68, 0.6)';
    ctx.shadowBlur = 12;
    ctx.fill();

    // Feuille de la pomme
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.ellipse(appleX + 3, appleY - appleRadius - 1, 3, 2, Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = '#30dd69';
    ctx.fill();
    ctx.restore();

    // 3. Dessin du Serpent avec dégradé le long du corps & tête épurée
    const totalSegments = snake.length;

    snake.forEach((seg, index) => {
      const isHead = index === 0;
      const isTail = index === totalSegments - 1;
      const x = seg.x * CELL_SIZE;
      const y = seg.y * CELL_SIZE;

      ctx.save();

      // Dégradé fluide le long du corps (de la tête en couleur secondaire vers la queue en couleur primaire)
      const ratio = totalSegments > 1 ? index / (totalSegments - 1) : 0;
      const r = Math.round(ACTIVE_THEME.secondary.rgb.r + (ACTIVE_THEME.primary.rgb.r - ACTIVE_THEME.secondary.rgb.r) * ratio);
      const g = Math.round(ACTIVE_THEME.secondary.rgb.g + (ACTIVE_THEME.primary.rgb.g - ACTIVE_THEME.secondary.rgb.g) * ratio);
      const b = Math.round(ACTIVE_THEME.secondary.rgb.b + (ACTIVE_THEME.primary.rgb.b - ACTIVE_THEME.secondary.rgb.b) * ratio);

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

      // Forme du segment (tête plus arrondie, corps net et queue légèrement effilée)
      const radius = isHead ? 8 : isTail ? 5 : 4;
      ctx.beginPath();
      ctx.roundRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2, radius);
      ctx.fill();

      // Tête du serpent : design sobre, moderne et épuré (deux points discrets orientés dans la direction)
      if (isHead) {
        ctx.fillStyle = '#0a0c10'; // Points sombres sobres et lisibles
        let eye1X = 0, eye1Y = 0, eye2X = 0, eye2Y = 0;
        const frontOffset = 6;
        const sideOffset = 6;
        const eyeRadius = 1.6;

        switch (direction) {
          case 'RIGHT':
            eye1X = x + CELL_SIZE - frontOffset; eye1Y = y + sideOffset;
            eye2X = x + CELL_SIZE - frontOffset; eye2Y = y + CELL_SIZE - sideOffset;
            break;
          case 'LEFT':
            eye1X = x + frontOffset; eye1Y = y + sideOffset;
            eye2X = x + frontOffset; eye2Y = y + CELL_SIZE - sideOffset;
            break;
          case 'UP':
            eye1X = x + sideOffset; eye1Y = y + frontOffset;
            eye2X = x + CELL_SIZE - sideOffset; eye2Y = y + frontOffset;
            break;
          case 'DOWN':
            eye1X = x + sideOffset; eye1Y = y + CELL_SIZE - frontOffset;
            eye2X = x + CELL_SIZE - sideOffset; eye2Y = y + CELL_SIZE - frontOffset;
            break;
        }

        ctx.beginPath();
        ctx.arc(eye1X, eye1Y, eyeRadius, 0, Math.PI * 2);
        ctx.arc(eye2X, eye2Y, eyeRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }, [snake, food, direction]);

  // Sauvegarde du score dans le Leaderboard serveur
  const handleSaveScore = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPseudo = pseudoInput.trim().toUpperCase().slice(0, 3) || 'EXP';
    setIsSaving(true);

    try {
      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo: cleanPseudo, score }),
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.leaderboard)) {
          setLeaderboard(data.leaderboard);
          localStorage.setItem('explicit_snake_leaderboard', JSON.stringify(data.leaderboard));
          setScoreSaved(true);
          setIsSaving(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Erreur envoi au serveur, sauvegarde locale de secours :', err);
    }

    // Fallback local en cas de problème réseau (IP gérée côté serveur)
    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      pseudo: cleanPseudo,
      score,
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
    };

    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setLeaderboard(updated);
    localStorage.setItem('explicit_snake_leaderboard', JSON.stringify(updated));
    setScoreSaved(true);
    setIsSaving(false);
  };

  // Top 5 affiché
  const top5 = leaderboard.slice(0, 5);

  return (
    <div className="snake-page main-content">
      {/* Bouton Accueil fixé / positionné en haut à gauche */}
      <button 
        className="snake-back-btn secondary-button interactive" 
        onClick={() => navigate('/')}
        aria-label="Retour à l'accueil"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Accueil
      </button>

      {/* Titre du jeu centré */}
      <ScrollReveal>
        <div className="snake-header">
          <div className="snake-title-group">
            <h1 className="snake-main-title">SNAKE</h1>
          </div>
        </div>
      </ScrollReveal>

      <div className="snake-layout">
        {/* CARTE DE JEU */}
        <div className="snake-game-card">
          <div className="snake-top-bar">
            <div className="snake-score-display">
              <span className="stat-label">SCORE</span>
              <span className="score-num">{score}</span>
            </div>
            <div className="snake-record-display">
              <span className="stat-label">RECORD</span>
              <span className="record-num">{bestScore}</span>
            </div>
          </div>

          <div className="snake-canvas-container">
            <canvas 
              ref={canvasRef} 
              width={BOARD_SIZE} 
              height={BOARD_SIZE} 
              className="snake-canvas" 
            />

            {/* Écran d'accueil avant démarrage */}
            {!gameStarted && (
              <div className="snake-overlay">
                <h2 className="overlay-title">SNAKE</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '280px', fontSize: '0.9rem' }}>
                  Contrôlez le serpent avec les flèches ou ZQSD. Mangez les cibles pour grimper dans le classement !
                </p>
                <button className="overlay-btn interactive" onClick={restartGame}>
                  JOUER
                </button>
              </div>
            )}

            {/* Écran de Game Over & Enregistrement du score (format compact non-zoomé) */}
            {gameOver && (
              <div className="snake-overlay snake-defeat-overlay">
                <h2 className="overlay-title" style={{ color: '#ff4e4e' }}>GAME OVER</h2>
                <div className="overlay-final-score">
                  Score final : <span className="overlay-score-val">{score}</span>
                </div>

                {!scoreSaved ? (
                  <form onSubmit={handleSaveScore} className="arcade-input-section">
                    <span className="arcade-label">Pseudo (3 lettres) :</span>
                    <input 
                      type="text" 
                      maxLength={3} 
                      value={pseudoInput} 
                      onChange={(e) => setPseudoInput(e.target.value.toUpperCase().slice(0, 3))}
                      placeholder="EXP"
                      className="arcade-input interactive"
                      autoFocus
                      required
                    />
                    <button 
                      type="submit" 
                      className="overlay-btn overlay-btn-sm interactive" 
                      disabled={isSaving}
                      style={{ opacity: isSaving ? 0.7 : 1 }}
                    >
                      {isSaving ? 'Envoi...' : 'Enregistrer'}
                    </button>
                  </form>
                ) : (
                  <p className="overlay-success-msg">
                    Score enregistré dans le Top 5 !
                  </p>
                )}

                <button 
                  className="secondary-button overlay-btn-sm interactive" 
                  onClick={restartGame}
                >
                  Rejouer
                </button>
              </div>
            )}

            {/* Pause */}
            {isPaused && !gameOver && (
              <div className="snake-overlay">
                <h2 className="overlay-title">PAUSE</h2>
                <button className="overlay-btn interactive" onClick={() => setIsPaused(false)}>
                  Reprendre
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CLASSEMENT TOP 5 & INFOS */}
        <div className="snake-leaderboard-card">
          <div className="leaderboard-header">
            <h2 className="leaderboard-title">
              <span>TOP 5 ARCADE</span>
            </h2>
          </div>

          <div className="leaderboard-list">
            {top5.length > 0 ? (
              top5.map((entry, idx) => (
                <div key={entry.id} className={`leaderboard-row rank-${idx + 1}`}>
                  <span className="rank-badge">
                    #{idx + 1}
                  </span>
                  <div className="player-info">
                    <span className="player-pseudo">{entry.pseudo}</span>
                    <span className="player-date">{entry.date}</span>
                  </div>
                  <span className="player-score">{entry.score} pts</span>
                </div>
              ))
            ) : (
              <div className="leaderboard-empty">
                Aucun score enregistré. Soyez le premier à inscrire vos 3 lettres !
              </div>
            )}
          </div>

          <div className="snake-instructions">
            <strong>Commandes :</strong>
            <br />• Flèches ou ZQSD / WASD pour diriger
            <br />• Espace pour mettre en pause
            <br />• Classement en ligne sur serveur
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakePage;
