import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Trophy, Zap, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const SequenceGamePage = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('menu'); // 'menu', 'showing', 'playing', 'finished'
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [activeColor, setActiveColor] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const colors = [
    { id: 0, name: 'Blau', color: 'bg-primary', sound: 261.63 },
    { id: 1, name: 'Rot', color: 'bg-destructive', sound: 329.63 },
    { id: 2, name: 'Grün', color: 'bg-success', sound: 392.00 },
    { id: 3, name: 'Gelb', color: 'bg-secondary', sound: 523.25 }
  ];

  const audioContext = useRef(null);

  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const playSound = (frequency) => {
    if (!audioContext.current) return;
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.3);
    
    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + 0.3);
  };

  const startGame = () => {
    setLevel(1);
    setSequence([]);
    setUserSequence([]);
    setGameState('showing');
    addToSequence([]);
  };

  const addToSequence = (currentSequence) => {
    const newSequence = [...currentSequence, Math.floor(Math.random() * 4)];
    setSequence(newSequence);
    setTimeout(() => showSequence(newSequence), 500);
  };

  const showSequence = async (seq) => {
    setIsPlaying(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setActiveColor(seq[i]);
      playSound(colors[seq[i]].sound);
      await new Promise(resolve => setTimeout(resolve, 600));
      setActiveColor(null);
    }
    setIsPlaying(false);
    setGameState('playing');
    toast.info('Jetzt bist du dran! 🎯', { duration: 2000 });
  };

  const handleColorClick = (colorId) => {
    if (gameState !== 'playing' || isPlaying) return;

    setActiveColor(colorId);
    playSound(colors[colorId].sound);
    setTimeout(() => setActiveColor(null), 300);

    const newUserSequence = [...userSequence, colorId];
    setUserSequence(newUserSequence);

    // Check if the user's input matches the sequence so far
    const currentIndex = newUserSequence.length - 1;
    if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
      // Wrong!
      toast.error('Ups! Das war nicht richtig 😅');
      setGameState('finished');
      if (level > highScore) {
        setHighScore(level);
        toast.success(`Neuer Rekord: Level ${level}! 🏆`);
      }
      return;
    }

    // Check if user completed the sequence
    if (newUserSequence.length === sequence.length) {
      // Correct!
      toast.success(`Level ${level} geschafft! 🎉`);
      setLevel(level + 1);
      setUserSequence([]);
      setGameState('showing');
      setTimeout(() => addToSequence(sequence), 1000);
    }
  };

  return (
    <div className="min-h-screen star-pattern flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/')}
            className="rounded-xl font-display font-semibold btn-bounce border-2"
          >
            <Home className="w-5 h-5 mr-2" />
            Zurück
          </Button>

          {(gameState === 'showing' || gameState === 'playing') && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft">
                <Zap className="w-5 h-5 text-secondary" />
                <span className="font-display font-bold text-lg">Level {level}</span>
              </div>
              {highScore > 0 && (
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-display font-bold text-lg">{highScore}</span>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-4xl flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* Menu State */}
          {gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8 w-full"
            >
              <div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Zap className="w-12 h-12 md:w-16 md:h-16 text-secondary" />
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                    Sequenz-Spiel
                  </h1>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                  Merke dir die Reihenfolge und wiederhole sie! 🎵✨
                </p>
              </div>

              <Card className="p-8 md:p-12 shadow-large max-w-2xl mx-auto">
                <div className="text-6xl mb-6">🧠</div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  Wie es funktioniert:
                </h3>
                <div className="text-left space-y-3 text-base md:text-lg text-foreground/80 mb-8">
                  <p>1️⃣ Beobachte die Farben die aufleuchten</p>
                  <p>2️⃣ Merke dir die Reihenfolge</p>
                  <p>3️⃣ Wiederhole die Sequenz</p>
                  <p>4️⃣ Jedes Level wird länger! 🎯</p>
                </div>

                {highScore > 0 && (
                  <div className="mb-6 p-4 bg-primary-light rounded-xl">
                    <div className="flex items-center justify-center gap-2 text-xl font-display font-bold">
                      <Trophy className="w-6 h-6" />
                      Rekord: Level {highScore}
                    </div>
                  </div>
                )}

                <Button
                  size="lg"
                  onClick={startGame}
                  className="w-full text-lg md:text-xl py-7 rounded-2xl font-display font-bold btn-bounce"
                >
                  Spiel starten! 🚀
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Playing State */}
          {(gameState === 'showing' || gameState === 'playing') && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full"
            >
              <div className="text-center mb-8">
                <motion.p
                  key={gameState}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl md:text-2xl font-display font-bold text-foreground"
                >
                  {gameState === 'showing' ? 'Merke dir die Reihenfolge! 👀' : 'Jetzt du! Klicke die Farben! 🎯'}
                </motion.p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
                {colors.map((color) => (
                  <motion.div
                    key={color.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: color.id * 0.1, type: 'spring' }}
                    whileHover={gameState === 'playing' && !isPlaying ? { scale: 1.05 } : {}}
                    whileTap={gameState === 'playing' && !isPlaying ? { scale: 0.95 } : {}}
                  >
                    <Card
                      className={`
                        aspect-square cursor-pointer transition-all duration-150 border-4
                        ${color.color} 
                        ${activeColor === color.id ? 'brightness-150 scale-105 shadow-large' : 'brightness-90'}
                        ${gameState === 'playing' && !isPlaying ? 'hover:brightness-100' : ''}
                      `}
                      onClick={() => handleColorClick(color.id)}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl md:text-6xl font-display font-bold text-white opacity-0">
                          {color.name}
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Finished State */}
          {gameState === 'finished' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-8 w-full"
            >
              <Card className="p-8 md:p-12 shadow-large max-w-2xl mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="text-7xl md:text-8xl mb-6"
                >
                  {level > 5 ? '🏆' : level > 3 ? '🌟' : '💪'}
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Level {level} erreicht!
                </h2>

                <div className="text-xl md:text-2xl text-muted-foreground font-medium mb-8">
                  {level > 10 ? 'Unglaublich! Du hast ein Super-Gedächtnis! 🧠✨' :
                   level > 5 ? 'Fantastisch! Sehr gut gemacht! 👏' :
                   level > 3 ? 'Gut gemacht! Weiter so! 💪' :
                   'Guter Start! Übe weiter! 🎯'}
                </div>

                {level > highScore && (
                  <div className="mb-6 p-4 bg-secondary-light rounded-xl">
                    <p className="text-xl font-display font-bold text-secondary-foreground">
                      🎉 Neuer Rekord: Level {level}!
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={startGame}
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
                    Zum Menü
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

export default SequenceGamePage;
