import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Trophy, Star, Brain, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const MemoryGamePage = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'finished'
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'];

  const difficulties = [
    { id: 'easy', name: 'Leicht', pairs: 6, emoji: '😊', color: 'from-success to-success-light' },
    { id: 'medium', name: 'Mittel', pairs: 8, emoji: '🤔', color: 'from-warning to-warning/80' },
    { id: 'hard', name: 'Schwer', pairs: 12, emoji: '🤓', color: 'from-destructive to-destructive/80' }
  ];

  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    if (matchedPairs.length > 0 && matchedPairs.length === cards.length / 2) {
      setTimeout(() => {
        setGameState('finished');
        toast.success('Fantastisch! Alle Paare gefunden! 🎉');
      }, 500);
    }
  }, [matchedPairs, cards]);

  const startGame = (diff) => {
    const pairCount = difficulties.find(d => d.id === diff).pairs;
    const selectedEmojis = [...emojis].sort(() => Math.random() - 0.5).slice(0, pairCount);
    const gameCards = [...selectedEmojis, ...selectedEmojis]
      .map((emoji, index) => ({ id: index, emoji, matched: false }))
      .sort(() => Math.random() - 0.5);

    setDifficulty(diff);
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setTime(0);
    setGameState('playing');
  };

  const handleCardClick = (index) => {
    if (isChecking || flippedCards.includes(index) || matchedPairs.includes(cards[index].emoji)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves(moves + 1);

      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatchedPairs([...matchedPairs, cards[first].emoji]);
        toast.success('Gut gemacht! 🌟', { duration: 1000 });
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-display font-bold text-lg">{moves} Züge</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft">
                <span className="font-display font-bold text-lg">⏱️ {formatTime(time)}</span>
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
                  <Brain className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                    Gedächtnisspiel
                  </h1>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                  Finde alle passenden Paare! 🧠✨
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
                        <p className="text-lg text-card/90 font-semibold">{diff.pairs} Paare</p>
                      </div>
                      <div className="p-6">
                        <Button
                          className="w-full text-lg py-6 rounded-xl font-display font-bold btn-bounce"
                          size="lg"
                        >
                          Spielen!
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Playing State */}
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className={`grid gap-3 md:gap-4 ${
                difficulty === 'easy' ? 'grid-cols-4' : 
                difficulty === 'medium' ? 'grid-cols-4' : 
                'grid-cols-6'
              } max-w-4xl mx-auto`}>
                {cards.map((card, index) => {
                  const isFlipped = flippedCards.includes(index) || matchedPairs.includes(card.emoji);
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ scale: 0, rotateY: 0 }}
                      animate={{ scale: 1, rotateY: 0 }}
                      transition={{ delay: index * 0.02, type: 'spring' }}
                      whileHover={!isFlipped ? { scale: 1.05 } : {}}
                      whileTap={!isFlipped ? { scale: 0.95 } : {}}
                    >
                      <Card
                        className={`aspect-square cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                          matchedPairs.includes(card.emoji) 
                            ? 'border-success bg-success-light' 
                            : isFlipped 
                            ? 'border-primary' 
                            : 'border-border hover:border-primary'
                        }`}
                        onClick={() => handleCardClick(index)}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <AnimatePresence mode="wait">
                            {isFlipped ? (
                              <motion.div
                                key="emoji"
                                initial={{ rotateY: 90, scale: 0 }}
                                animate={{ rotateY: 0, scale: 1 }}
                                exit={{ rotateY: 90, scale: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-4xl md:text-5xl"
                              >
                                {card.emoji}
                              </motion.div>
                            ) : (
                              <motion.div
                                key="back"
                                initial={{ rotateY: 90, scale: 0 }}
                                animate={{ rotateY: 0, scale: 1 }}
                                exit={{ rotateY: 90, scale: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-4xl md:text-5xl"
                              >
                                ❓
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
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
              className="text-center space-y-8"
            >
              <Card className="p-8 md:p-12 shadow-large max-w-2xl mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="text-7xl md:text-8xl mb-6"
                >
                  🏆
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Geschafft!
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center gap-6 text-2xl md:text-3xl">
                    <div className="flex items-center gap-2">
                      <Brain className="w-8 h-8 text-primary" />
                      <span className="font-display font-bold">{moves} Züge</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">⏱️</span>
                      <span className="font-display font-bold">{formatTime(time)}</span>
                    </div>
                  </div>

                  <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                    {moves < cards.length ? 'Perfekt! Ausgezeichnetes Gedächtnis! 🌟' : 
                     moves < cards.length * 1.5 ? 'Sehr gut gemacht! 👏' : 
                     'Gut! Weiter üben! 💪'}
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

export default MemoryGamePage;
