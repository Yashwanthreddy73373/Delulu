import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Play, RotateCcw } from 'lucide-react';
import { Direction, Point } from '../types.ts';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, GAME_SPEED } from '../constants.ts';

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = currentSnake.some((segment) => segment.x === newFood!.x && segment.y === newFood!.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== Direction.DOWN) setDirection(Direction.UP);
          break;
        case 'ArrowDown':
          if (direction !== Direction.UP) setDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
          if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
          if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (isPaused || isGameOver) return;

    const moveSnake = () => {
      const head = { ...snake[0] };
      switch (direction) {
        case Direction.UP:
          head.y -= 1;
          break;
        case Direction.DOWN:
          head.y += 1;
          break;
        case Direction.LEFT:
          head.x -= 1;
          break;
        case Direction.RIGHT:
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setIsGameOver(true);
        return;
      }

      // Check self collision
      if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setIsGameOver(true);
        return;
      }

      const newSnake = [head, ...snake];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(interval);
  }, [snake, direction, food, isPaused, isGameOver, generateFood]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  // Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    // Clear background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid (Subtle)
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i < GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw Snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00ffff' : '#ff00ff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = index === 0 ? '#00ffff' : '#ff00ff';
      ctx.fillRect(segment.x * cellSize + 1, segment.y * cellSize + 1, cellSize - 2, cellSize - 2);
      ctx.shadowBlur = 0;
    });

    // Draw Food
    ctx.fillStyle = '#39ff14';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#39ff14';
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [snake, food]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full justify-between items-center px-4">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-white/50 font-mono">Current Score</span>
          <span className="text-3xl font-bold neon-text-cyan font-mono">{score}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs uppercase tracking-widest text-white/50 font-mono flex items-center gap-1">
            <Trophy size={12} /> High Score
          </span>
          <span className="text-2xl font-bold text-neon-purple font-mono">{highScore}</span>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink to-neon-cyan blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="relative bg-black border-2 border-white/10 rounded-lg"
        />

        <AnimatePresence>
          {(isPaused || isGameOver) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm"
            >
              {isGameOver ? (
                <div className="text-center animate-pulse">
                  <h2 className="text-4xl font-black neon-text-pink mb-2 uppercase tracking-tighter italic">Game Over</h2>
                  <p className="text-white/60 mb-6 font-mono">Final Score: {score}</p>
                  <button
                    onClick={resetGame}
                    className="flex items-center gap-2 px-6 py-3 bg-neon-pink rounded-full text-black font-bold hover:scale-105 transition-transform"
                  >
                    <RotateCcw size={20} /> Try Again
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-4xl font-black neon-text-cyan mb-8 uppercase tracking-tighter italic">Ready?</h2>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="flex items-center gap-2 px-8 py-4 bg-neon-cyan rounded-full text-black font-bold hover:scale-110 transition-transform neon-border-cyan"
                  >
                    <Play fill="currentColor" size={24} /> Start Game
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-white/40 font-mono animate-pulse">
        Use ARROW KEYS to navigate
      </p>
    </div>
  );
}
