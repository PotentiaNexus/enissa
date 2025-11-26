import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Eye, Target, Timer, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const FocusGamePage = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'finished'
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [clicks, setClicks] = useState(0);
  const [speed, setSpeed] = useState(2000);
  const [difficulty, setDifficulty] = useState('easy');

  const difficulties = [
    { id: 'easy', name: 'Langsam', speed: 2000, emoji: '🐢', color: 'from-success to-success-light' },
    { id: 'medium', name: 'Mittel', speed: 1200, emoji: '🐰', color: 'from-warning to-warning/80' },
    { id: 'hard', name: 'Schnell', speed: 800, emoji: '🚀', color: 'from-destructive to-destructive/80' }
  ];

  useEffect(() => {
    let interval;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished');
      toast.success(`Spiel beendet! ${score} Punkte! 🎯`);
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft, score]);

  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        moveTarget();
      }, speed);
    }
    return () => clearInterval(interval);
  }, [gameState, speed]);

  const moveTarget = () => {
    const x = Math.random() * 80 + 10; // 10-90%
    const y = Math.random() * 80 + 10;
    setTargetPosition({ x, y });
  };

  const startGame = (diff) => {
    const selectedDiff = difficulties.find(d => d.id === diff);
    setDifficulty(diff);
    setSpeed(selectedDiff.speed);
    setScore(0);
    setClicks(0);
    setTimeLeft(30);
    setGameState('playing');
    moveTarget();
  };

  const handleTargetClick = () => {
    setScore(score + 1);
    setClicks(clicks + 1);
    moveTarget();
    toast.success('Getroffen! +1 🎯', { duration: 500 });
  };

  const handleMissClick = () => {
    setClicks(clicks + 1);
  };

  const accuracy = clicks > 0 ? Math.round((score / clicks) * 100) : 0;

  return (
    <div className="min-h-screen star-pattern flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/')}
            className="rounded-xl font-display font-semibold btn-bounce border-2"
          >
            <Home className="w-5 h-5 mr-2" />
            Zurück
          </Button>

          {gameState === 'playing' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-display font-bold text-lg">{score} Punkte</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft">
                <Timer className="w-5 h-5 text-secondary" />
                <span className="font-display font-bold text-lg">{timeLeft}s</span>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <AnimatePresence mode="wait">
          {/* Menu State */}
          {gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Eye className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                    Fokus-Training
                  </h1>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                  Klicke so schnell wie möglich auf die Ziele! 🎯
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {difficulties.map((diff, index) => (
                  <motion.div
                    key={diff.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-large transition-all duration-300 border-2 hover:border-primary overflow-hidden"
                      onClick={() => startGame(diff.id)}
                    >
                      <div className={`bg-gradient-to-br ${diff.color} p-6 md:p-8 text-center`}>
                        <div className="text-5xl md:text-6xl mb-3">{diff.emoji}</div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-card mb-2">
                          {diff.name}
                        </h3>
                        <p className="text-lg text-card/90 font-semibold">30 Sekunden</p>
                      </div>
                      <div className="p-6">
                        <Button
                          className="w-full text-lg py-6 rounded-xl font-display font-bold btn-bounce"
                          size="lg"
                        >
                          Start!
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="p-6 md:p-8 max-w-2xl mx-auto bg-muted/50">
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-display font-bold text-foreground">
                    💡 Warum ist dieses Spiel gut für dich?
                  </h3>
                  <div className="text-left space-y-2 text-foreground/80">
                    <p>✓ Verbessert deine Reaktionszeit</p>
                    <p>✓ Trainiert deine Konzentration</p>
                    <p>✓ Hilft dir, fokussiert zu bleiben</p>
                    <p>✓ Macht Spaß und ist herausfordernd! 🎮</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Playing State */}
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <Card
                className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-muted/30 to-background overflow-hidden cursor-crosshair"
                onClick={handleMissClick}
              >
                <motion.div
                  key={`${targetPosition.x}-${targetPosition.y}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    position: 'absolute',
                    left: `${targetPosition.x}%`,
                    top: `${targetPosition.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTargetClick();
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-destructive flex items-center justify-center text-3xl md:text-4xl shadow-large animate-pulse-soft">
                      🎯
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-destructive/30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          )}

          {/* Finished State */}
          {gameState === 'finished' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-8"
            >
              <Card className="p-8 md:p-12 shadow-large max-w-2xl mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="text-7xl md:text-8xl mb-6"
                >
                  {score >= 20 ? '🏆' : score >= 15 ? '🌟' : score >= 10 ? '👏' : '💪'}
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Zeit abgelaufen!
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary-light rounded-xl">
                      <div className="text-3xl md:text-4xl font-display font-bold text-primary">
                        {score}
                      </div>
                      <div className="text-sm md:text-base text-foreground/70">Treffer</div>
                    </div>
                    <div className="p-4 bg-secondary-light rounded-xl">
                      <div className="text-3xl md:text-4xl font-display font-bold text-secondary-foreground">
                        {accuracy}%
                      </div>
                      <div className="text-sm md:text-base text-foreground/70">Genauigkeit</div>
                    </div>
                  </div>

                  <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                    {score >= 20 ? 'Unglaublich! Blitzschnelle Reaktion! ⚡' :
                     score >= 15 ? 'Fantastisch! Super Konzentration! 🎯' :
                     score >= 10 ? 'Gut gemacht! Weiter üben! 💪' :
                     'Guter Start! Trainiere weiter! 🎮'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => startGame(difficulty)}
                    className="text-lg md:text-xl py-6 md:py-7 px-8 rounded-2xl font-display font-bold btn-bounce"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Nochmal spielen!
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setGameState('menu')}
                    className="text-lg md:text-xl py-6 md:py-7 px-8 rounded-2xl font-display font-bold btn-bounce border-2"
                  >
                    Schwierigkeit wählen
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default FocusGamePage;
