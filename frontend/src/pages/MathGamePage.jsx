import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Trophy, Star, Zap, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const MathGamePage = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'finished'
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [visualMode, setVisualMode] = useState(true); // Show fruits/vegetables

  const totalQuestions = 10;

  // Obst und Gemüse für visuelle Darstellung
  const visualItems = [
    { emoji: '🍎', name: 'Apfel' },
    { emoji: '🍊', name: 'Orange' },
    { emoji: '🍌', name: 'Banane' },
    { emoji: '🍇', name: 'Traube' },
    { emoji: '🍓', name: 'Erdbeere' },
    { emoji: '🍉', name: 'Wassermelone' },
    { emoji: '🥕', name: 'Karotte' },
    { emoji: '🥒', name: 'Gurke' },
    { emoji: '🍅', name: 'Tomate' },
    { emoji: '🥦', name: 'Brokkoli' },
    { emoji: '🌽', name: 'Mais' },
    { emoji: '🍑', name: 'Pfirsich' },
    { emoji: '🍐', name: 'Birne' },
    { emoji: '🥔', name: 'Kartoffel' },
    { emoji: '🍆', name: 'Aubergine' },
  ];

  const difficulties = [
    { id: 'easy', name: 'Leicht', desc: '1-10', color: 'from-success to-success-light', emoji: '😊' },
    { id: 'medium', name: 'Mittel', desc: '10-50', color: 'from-warning to-warning/80', emoji: '🤔' },
    { id: 'hard', name: 'Schwer', desc: '50-100', color: 'from-destructive to-destructive/80', emoji: '🤓' }
  ];

  const generateQuestion = (diff) => {
    let num1, num2, operation;
    
    if (diff === 'easy') {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      operation = Math.random() > 0.5 ? '+' : '-';
      if (operation === '-' && num1 < num2) [num1, num2] = [num2, num1];
    } else if (diff === 'medium') {
      num1 = Math.floor(Math.random() * 40) + 10;
      num2 = Math.floor(Math.random() * 40) + 10;
      operation = ['+', '-', '×'][Math.floor(Math.random() * 3)];
      if (operation === '-' && num1 < num2) [num1, num2] = [num2, num1];
      if (operation === '×') {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
      }
    } else {
      num1 = Math.floor(Math.random() * 50) + 50;
      num2 = Math.floor(Math.random() * 50) + 50;
      operation = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)];
      if (operation === '-' && num1 < num2) [num1, num2] = [num2, num1];
      if (operation === '×') {
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
      }
      if (operation === '÷') {
        num2 = Math.floor(Math.random() * 10) + 2;
        const result = Math.floor(Math.random() * 20) + 1;
        num1 = num2 * result;
      }
    }

    let correctAnswer;
    if (operation === '+') correctAnswer = num1 + num2;
    else if (operation === '-') correctAnswer = num1 - num2;
    else if (operation === '×') correctAnswer = num1 * num2;
    else correctAnswer = Math.floor(num1 / num2);

    // Generate wrong answers
    const answers = new Set([correctAnswer]);
    while (answers.size < 4) {
      const offset = Math.floor(Math.random() * 10) - 5;
      const wrongAnswer = correctAnswer + offset;
      if (wrongAnswer >= 0 && wrongAnswer !== correctAnswer) {
        answers.add(wrongAnswer);
      }
    }

    return {
      num1,
      num2,
      operation,
      correctAnswer,
      answers: Array.from(answers).sort(() => Math.random() - 0.5)
    };
  };

  const startGame = (diff) => {
    setDifficulty(diff);
    setGameState('playing');
    setScore(0);
    setQuestionNumber(1);
    setStreak(0);
    setMaxStreak(0);
    setCurrentQuestion(generateQuestion(diff));
  };

  const handleAnswer = (answer) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      
      toast.success('Richtig! 🎉', {
        description: newStreak > 2 ? `${newStreak} in Folge! 🔥` : 'Weiter so!'
      });
    } else {
      setStreak(0);
      toast.error('Nicht ganz richtig 😊', {
        description: `Die richtige Antwort war ${currentQuestion.correctAnswer}`
      });
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (questionNumber < totalQuestions) {
        setQuestionNumber(questionNumber + 1);
        setCurrentQuestion(generateQuestion(difficulty));
      } else {
        setGameState('finished');
      }
    }, 2000);
  };

  const progress = (questionNumber / totalQuestions) * 100;

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
                <Trophy className="w-5 h-5 text-secondary" />
                <span className="font-display font-bold text-lg">{score}</span>
              </div>
              {streak > 2 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-xl shadow-soft"
                >
                  <Zap className="w-5 h-5" />
                  <span className="font-display font-bold text-lg">{streak}🔥</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-4xl">
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
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Mathe-Spiele 🎮
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                  Wähle deinen Schwierigkeitsgrad!
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
                      className="cursor-pointer hover:shadow-large transition-all duration-300 border-2 hover:border-primary overflow-hidden group"
                      onClick={() => startGame(diff.id)}
                    >
                      <div className={`bg-gradient-to-br ${diff.color} p-6 md:p-8 text-center`}>
                        <div className="text-5xl md:text-6xl mb-3">{diff.emoji}</div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-card mb-2">
                          {diff.name}
                        </h3>
                        <p className="text-lg text-card/90 font-semibold">{diff.desc}</p>
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
            </motion.div>
          )}

          {/* Playing State */}
          {gameState === 'playing' && currentQuestion && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6 md:space-y-8"
            >
              {/* Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-lg">
                    Frage {questionNumber} von {totalQuestions}
                  </span>
                  <span className="font-display font-bold text-lg text-primary">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              {/* Question Card */}
              <Card className="p-8 md:p-12 shadow-large border-2">
                <motion.div
                  key={questionNumber}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-8 md:space-y-10"
                >
                  <div className="text-5xl md:text-7xl font-display font-bold text-foreground">
                    {currentQuestion.num1} {currentQuestion.operation} {currentQuestion.num2} = ?
                  </div>

                  {/* Answer Options */}
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    {currentQuestion.answers.map((answer, index) => {
                      const isSelected = selectedAnswer === answer;
                      const isCorrect = answer === currentQuestion.correctAnswer;
                      const shouldShowCorrect = showFeedback && isCorrect;
                      const shouldShowWrong = showFeedback && isSelected && !isCorrect;

                      return (
                        <motion.div
                          key={index}
                          whileHover={!showFeedback ? { scale: 1.05 } : {}}
                          whileTap={!showFeedback ? { scale: 0.95 } : {}}
                        >
                          <Button
                            size="lg"
                            onClick={() => handleAnswer(answer)}
                            disabled={showFeedback}
                            className={`
                              w-full h-24 md:h-28 text-3xl md:text-4xl font-display font-bold rounded-2xl shadow-medium
                              transition-all duration-300
                              ${shouldShowCorrect ? 'bg-success text-success-foreground' : ''}
                              ${shouldShowWrong ? 'bg-destructive text-destructive-foreground' : ''}
                              ${!showFeedback ? 'hover:shadow-large' : ''}
                            `}
                            variant={showFeedback ? 'outline' : 'default'}
                          >
                            {shouldShowCorrect && <CheckCircle2 className="w-8 h-8 mr-3" />}
                            {shouldShowWrong && <XCircle className="w-8 h-8 mr-3" />}
                            {answer}
                          </Button>
                        </motion.div>
                      );
                    })}
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
              <Card className="p-8 md:p-12 shadow-large">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="text-7xl md:text-8xl mb-6"
                >
                  {score >= 8 ? '🏆' : score >= 5 ? '🌟' : '👍'}
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Super gemacht!
                </h2>
                
                <div className="space-y-4 mb-8">
                  <div className="text-6xl md:text-7xl font-display font-bold text-primary">
                    {score} / {totalQuestions}
                  </div>
                  <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                    {score >= 8 ? 'Fantastisch! 🎉' : score >= 5 ? 'Gut gemacht! 👏' : 'Weiter üben! 💪'}
                  </p>
                  
                  {maxStreak > 2 && (
                    <div className="flex items-center justify-center gap-2 text-xl">
                      <Star className="w-6 h-6 text-secondary" />
                      <span className="font-display font-bold">
                        Beste Serie: {maxStreak} 🔥
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => startGame(difficulty)}
                    className="text-lg md:text-xl py-6 md:py-7 px-8 rounded-2xl font-display font-bold btn-bounce"
                  >
                    Nochmal spielen! 🎮
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

export default MathGamePage;
