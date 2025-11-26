import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Trophy, Clock, Shuffle, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const PuzzleGamePage = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'finished'
  const [difficulty, setDifficulty] = useState('easy');
  const [tiles, setTiles] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(0);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Disney-Charakter Emojis und Themen
  const characters = [
    { 
      id: 'princess', 
      name: 'Prinzessinnen', 
      emoji: '👸', 
      colors: ['#FFB6C1', '#FF69B4', '#DDA0DD', '#FFE4E1', '#FFC0CB', '#FF1493', '#C71585', '#DB7093', '#FFB3BA'],
      gradient: 'from-pink-400 to-purple-400'
    },
    { 
      id: 'heroes', 
      name: 'Helden', 
      emoji: '🦸', 
      colors: ['#4169E1', '#1E90FF', '#00BFFF', '#87CEEB', '#4682B4', '#5F9EA0', '#6495ED', '#00CED1', '#48D1CC'],
      gradient: 'from-blue-400 to-cyan-400'
    },
    { 
      id: 'animals', 
      name: 'Tiere', 
      emoji: '🦁', 
      colors: ['#FFD700', '#FFA500', '#FF8C00', '#FF6347', '#FF4500', '#DC143C', '#B22222', '#8B4513', '#D2691E'],
      gradient: 'from-orange-400 to-red-400'
    },
    { 
      id: 'magic', 
      name: 'Magie', 
      emoji: '✨', 
      colors: ['#9370DB', '#8A2BE2', '#9400D3', '#9932CC', '#BA55D3', '#DA70D6', '#EE82EE', '#DDA0DD', '#D8BFD8'],
      gradient: 'from-purple-400 to-pink-400'
    },
    { 
      id: 'ocean', 
      name: 'Ozean', 
      emoji: '🧜‍♀️', 
      colors: ['#00CED1', '#20B2AA', '#48D1CC', '#40E0D0', '#7FFFD4', '#00FFFF', '#5F9EA0', '#4682B4', '#87CEEB'],
      gradient: 'from-cyan-400 to-blue-400'
    },
    { 
      id: 'adventure', 
      name: 'Abenteuer', 
      emoji: '🗺️', 
      colors: ['#228B22', '#32CD32', '#00FA9A', '#98FB98', '#90EE90', '#3CB371', '#2E8B57', '#008000', '#006400'],
      gradient: 'from-green-400 to-emerald-400'
    }
  ];

  const difficulties = [
    { id: 'easy', name: 'Leicht', size: 3, emoji: '😊', color: 'from-success to-success-light' },
    { id: 'medium', name: 'Mittel', size: 4, emoji: '🤔', color: 'from-warning to-warning/80' },
    { id: 'hard', name: 'Schwer', size: 5, emoji: '🤯', color: 'from-destructive to-destructive/80' }
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

  const createPuzzle = (size, character) => {
    const totalTiles = size * size;
    const puzzle = Array.from({ length: totalTiles - 1 }, (_, i) => i);
    puzzle.push(null); // Empty space
    
    // Shuffle the puzzle (ensure it's solvable)
    for (let i = 0; i < 1000; i++) {
      const emptyIdx = puzzle.indexOf(null);
      const possibleMoves = getPossibleMoves(emptyIdx, size);
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      [puzzle[emptyIdx], puzzle[randomMove]] = [puzzle[randomMove], puzzle[emptyIdx]];
    }
    
    return puzzle;
  };

  const getPossibleMoves = (emptyIdx, size) => {
    const moves = [];
    const row = Math.floor(emptyIdx / size);
    const col = emptyIdx % size;
    
    if (row > 0) moves.push(emptyIdx - size); // Up
    if (row < size - 1) moves.push(emptyIdx + size); // Down
    if (col > 0) moves.push(emptyIdx - 1); // Left
    if (col < size - 1) moves.push(emptyIdx + 1); // Right
    
    return moves;
  };

  const startGame = (diff, character) => {
    const size = difficulties.find(d => d.id === diff).size;
    const puzzle = createPuzzle(size, character);
    
    setDifficulty(diff);
    setSelectedCharacter(character);
    setTiles(puzzle);
    setEmptyIndex(puzzle.indexOf(null));
    setMoves(0);
    setTime(0);
    setGameState('playing');
  };

  const handleTileClick = (index) => {
    const size = difficulties.find(d => d.id === difficulty).size;
    const possibleMoves = getPossibleMoves(emptyIndex, size);
    
    if (possibleMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      
      setTiles(newTiles);
      setEmptyIndex(index);
      setMoves(moves + 1);
      
      // Check if puzzle is solved
      const isSolved = newTiles.every((tile, idx) => {
        if (idx === newTiles.length - 1) return tile === null;
        return tile === idx;
      });
      
      if (isSolved) {
        setTimeout(() => {
          setGameState('finished');
          toast.success('Puzzle gelöst! 🎉🎊');
        }, 300);
      }
    } else {
      toast.error('Diese Kachel kann nicht bewegt werden! 🚫');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTileColor = (tileNumber) => {
    if (!selectedCharacter) return '#ccc';
    const colors = selectedCharacter.colors;
    return colors[tileNumber % colors.length];
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
                <Shuffle className="w-5 h-5 text-primary" />
                <span className="font-display font-bold text-lg">{moves} Züge</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft">
                <Clock className="w-5 h-5 text-secondary" />
                <span className="font-display font-bold text-lg">{formatTime(time)}</span>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <AnimatePresence mode="wait">
          {/* Menu State - Character Selection */}
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
                  <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-secondary" />
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                    IQ-Puzzle
                  </h1>
                  <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-accent" />
                </div>
                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                  Wähle dein Disney-Thema! ✨🎨
                </p>
              </div>

              {/* Character Selection */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {characters.map((character, index) => (
                  <motion.div
                    key={character.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-large transition-all duration-300 border-2 hover:border-primary overflow-hidden"
                      onClick={() => {
                        setSelectedCharacter(character);
                        toast.success(`${character.name} gewählt! ${character.emoji}`);
                      }}
                    >
                      <div className={`bg-gradient-to-br ${character.gradient} p-6 md:p-8 text-center`}>
                        <div className="text-6xl md:text-7xl mb-3">{character.emoji}</div>
                        <h3 className="text-xl md:text-2xl font-display font-bold text-card">
                          {character.name}
                        </h3>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Difficulty Selection (shown after character selection) */}
              {selectedCharacter && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                      Wähle die Schwierigkeit
                    </h2>
                    <p className="text-muted-foreground">
                      Thema: {selectedCharacter.name} {selectedCharacter.emoji}
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
                          onClick={() => startGame(diff.id, selectedCharacter)}
                        >
                          <div className={`bg-gradient-to-br ${diff.color} p-6 md:p-8 text-center`}>
                            <div className="text-5xl md:text-6xl mb-3">{diff.emoji}</div>
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-card mb-2">
                              {diff.name}
                            </h3>
                            <p className="text-lg text-card/90 font-semibold">{diff.size}x{diff.size}</p>
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
            </motion.div>
          )}

          {/* Playing State */}
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  {selectedCharacter.name} Puzzle {selectedCharacter.emoji}
                </h2>
                <p className="text-muted-foreground">
                  Schiebe die Kacheln, um das Bild zu ordnen!
                </p>
              </div>

              <div className="flex justify-center">
                <div 
                  className="grid gap-2 p-4 bg-card rounded-2xl shadow-large"
                  style={{
                    gridTemplateColumns: `repeat(${difficulties.find(d => d.id === difficulty).size}, 1fr)`,
                    width: 'fit-content'
                  }}
                >
                  {tiles.map((tile, index) => {
                    const size = difficulties.find(d => d.id === difficulty).size;
                    const isClickable = tile !== null && getPossibleMoves(emptyIndex, size).includes(index);
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                        whileHover={isClickable ? { scale: 1.05 } : {}}
                        whileTap={isClickable ? { scale: 0.95 } : {}}
                      >
                        <Card
                          className={`
                            w-16 h-16 md:w-20 md:h-20 flex items-center justify-center
                            transition-all duration-200 border-2
                            ${tile === null ? 'bg-muted/30 border-muted' : 'cursor-pointer border-border hover:border-primary'}
                            ${isClickable ? 'hover:shadow-medium' : ''}
                          `}
                          style={{
                            backgroundColor: tile !== null ? getTileColor(tile) : undefined
                          }}
                          onClick={() => handleTileClick(index)}
                        >
                          {tile !== null && (
                            <div className="flex flex-col items-center justify-center">
                              <span className="text-2xl md:text-3xl font-display font-bold text-white drop-shadow-lg">
                                {tile + 1}
                              </span>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => startGame(difficulty, selectedCharacter)}
                  className="rounded-xl font-display font-semibold btn-bounce border-2"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Neu mischen
                </Button>
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
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="text-7xl md:text-8xl mb-6"
                >
                  🏆✨
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Puzzle gelöst!
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="text-3xl mb-4">{selectedCharacter.emoji}</div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary-light rounded-xl">
                      <div className="text-3xl md:text-4xl font-display font-bold text-primary">
                        {moves}
                      </div>
                      <div className="text-sm md:text-base text-foreground/70">Züge</div>
                    </div>
                    <div className="p-4 bg-secondary-light rounded-xl">
                      <div className="text-3xl md:text-4xl font-display font-bold text-secondary-foreground">
                        {formatTime(time)}
                      </div>
                      <div className="text-sm md:text-base text-foreground/70">Zeit</div>
                    </div>
                  </div>

                  <p className="text-xl md:text-2xl text-muted-foreground font-medium mt-6">
                    {moves < 50 ? 'Fantastisch! Sehr effizient! 🌟' :
                     moves < 100 ? 'Super gemacht! 👏' :
                     'Gut! Weiter üben! 💪'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => startGame(difficulty, selectedCharacter)}
                    className="text-lg md:text-xl py-6 md:py-7 px-8 rounded-2xl font-display font-bold btn-bounce"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Nochmal spielen!
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setGameState('menu');
                      setSelectedCharacter(null);
                    }}
                    className="text-lg md:text-xl py-6 md:py-7 px-8 rounded-2xl font-display font-bold btn-bounce border-2"
                  >
                    Neues Thema wählen
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

export default PuzzleGamePage;
