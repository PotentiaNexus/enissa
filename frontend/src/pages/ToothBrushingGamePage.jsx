import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Clock, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { usePlayerName } from '@/components/PlayerProfile';

const ToothBrushingGamePage = () => {
  const navigate = useNavigate();
  const playerName = usePlayerName();
  const [gameState, setGameState] = useState('menu');
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [brushedAreas, setBrushedAreas] = useState([]);
  const [score, setScore] = useState(0);

  const steps = [
    {
      title: 'Zahnbürste vorbereiten',
      instruction: 'Gib eine erbsengroße Menge Zahnpasta auf die Bürste',
      emoji: '🦷',
      duration: 5
    },
    {
      title: 'Außenseiten putzen',
      instruction: 'Putze die Außenseiten der Zähne in kreisenden Bewegungen',
      emoji: '😁',
      duration: 30
    },
    {
      title: 'Innenseiten putzen',
      instruction: 'Jetzt die Innenseiten der Zähne putzen',
      emoji: '🦷',
      duration: 30
    },
    {
      title: 'Kauflächen putzen',
      instruction: 'Putze die Kauflächen mit Hin- und Her-Bewegungen',
      emoji: '😬',
      duration: 20
    },
    {
      title: 'Zunge reinigen',
      instruction: 'Vergiss nicht, auch deine Zunge zu putzen!',
      emoji: '👅',
      duration: 10
    },
    {
      title: 'Ausspülen',
      instruction: 'Spüle deinen Mund gründlich mit Wasser aus',
      emoji: '💧',
      duration: 10
    }
  ];

  const teethAreas = [
    { id: 'top-left', name: 'Oben Links', x: 20, y: 30 },
    { id: 'top-center', name: 'Oben Mitte', x: 50, y: 25 },
    { id: 'top-right', name: 'Oben Rechts', x: 80, y: 30 },
    { id: 'bottom-left', name: 'Unten Links', x: 20, y: 70 },
    { id: 'bottom-center', name: 'Unten Mitte', x: 50, y: 75 },
    { id: 'bottom-right', name: 'Unten Rechts', x: 80, y: 70 },
  ];

  useEffect(() => {
    let interval;
    if (gameState === 'brushing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'brushing') {
      handleNextStep();
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const startBrushing = () => {
    setGameState('brushing');
    setCurrentStep(0);
    setTimeLeft(steps[0].duration);
    setBrushedAreas([]);
    setScore(0);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimeLeft(steps[currentStep + 1].duration);
      if (currentStep === 1 || currentStep === 2 || currentStep === 3) {
        // Reward points for brushing steps
        const newScore = score + brushedAreas.length * 10;
        setScore(newScore);
        setBrushedAreas([]);
      }
    } else {
      setGameState('finished');
      const finalScore = score + 50; // Bonus for completing
      setScore(finalScore);
      toast.success('Perfekt geputzt! 🦷✨');
    }
  };

  const handleBrushArea = (areaId) => {
    if (!brushedAreas.includes(areaId) && (currentStep === 1 || currentStep === 2 || currentStep === 3)) {
      setBrushedAreas([...brushedAreas, areaId]);
      toast.success('Gut geputzt! ⭐', { duration: 500 });
    }
  };

  return (
    <div className="min-h-screen star-pattern flex flex-col">
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

          {gameState === 'brushing' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-display font-bold text-lg">{timeLeft}s</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft">
                <Star className="w-5 h-5 text-secondary" />
                <span className="font-display font-bold text-lg">{score}</span>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="text-8xl mb-4"
                >
                  🦷
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Zähneputzen
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                  {playerName !== 'Spieler' ? `${playerName}, l` : 'L'}erne richtig Zähne zu putzen!
                </p>
              </div>

              <Card className="p-8 md:p-12 shadow-large max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                      Warum ist Zähneputzen wichtig?
                    </h2>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">✨</span>
                      <div>
                        <h3 className="font-display font-bold text-lg">Gesunde Zähne</h3>
                        <p className="text-muted-foreground">Schützt vor Karies und Zahnschmerzen</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">😁</span>
                      <div>
                        <h3 className="font-display font-bold text-lg">Schönes Lächeln</h3>
                        <p className="text-muted-foreground">Weiße und saubere Zähne</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">🌟</span>
                      <div>
                        <h3 className="font-display font-bold text-lg">Frischer Atem</h3>
                        <p className="text-muted-foreground">Niemand mag schlechten Atem!</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      size="lg"
                      onClick={startBrushing}
                      className="w-full text-xl py-7 rounded-2xl font-display font-bold btn-bounce"
                    >
                      Jetzt putzen lernen! 🪥
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {gameState === 'brushing' && (
            <motion.div
              key="brushing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                    Schritt {currentStep + 1} von {steps.length}
                  </h2>
                  <p className="text-lg text-muted-foreground">{steps[currentStep].title}</p>
                </div>
                <Progress value={((currentStep + 1) / steps.length) * 100} className="h-3" />
              </div>

              <Card className="p-8 md:p-12 shadow-large">
                <motion.div
                  key={currentStep}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="text-8xl md:text-9xl">{steps[currentStep].emoji}</div>
                  <p className="text-xl md:text-2xl font-display font-semibold text-foreground">
                    {steps[currentStep].instruction}
                  </p>

                  {(currentStep === 1 || currentStep === 2 || currentStep === 3) && (
                    <div className="relative w-full max-w-md mx-auto aspect-square">
                      <Card className="w-full h-full bg-gradient-to-b from-pink-100 to-pink-50 relative overflow-hidden">
                        {/* Mouth */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-9xl">😬</div>
                        </div>

                        {/* Brushing Areas */}
                        {teethAreas.map((area) => (
                          <motion.button
                            key={area.id}
                            onClick={() => handleBrushArea(area.id)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ left: `${area.x}%`, top: `${area.y}%` }}
                            className={`absolute w-16 h-16 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all ${
                              brushedAreas.includes(area.id)
                                ? 'bg-success/50 border-4 border-success'
                                : 'bg-primary/20 border-4 border-primary/50 hover:bg-primary/40'
                            }`}
                          >
                            {brushedAreas.includes(area.id) && <span className="text-2xl">✓</span>}
                          </motion.button>
                        ))}
                      </Card>
                      <p className="text-sm text-muted-foreground mt-2">
                        Klicke auf alle Bereiche! {brushedAreas.length}/{teethAreas.length}
                      </p>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button
                      size="lg"
                      onClick={handleNextStep}
                      className="text-lg py-6 px-8 rounded-xl font-display font-bold btn-bounce"
                    >
                      {currentStep === steps.length - 1 ? 'Fertig!' : 'Weiter'}
                    </Button>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          )}

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
                  className="text-8xl mb-6"
                >
                  🦷✨
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Super geputzt{playerName !== 'Spieler' ? `, ${playerName}` : ''}!
                </h2>

                <div className="text-6xl font-display font-bold text-primary mb-6">
                  {score} Punkte
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-success-light rounded-xl">
                    <p className="text-lg font-display font-bold">
                      🎉 Deine Zähne sind jetzt blitzblank!
                    </p>
                  </div>
                  <p className="text-xl text-muted-foreground">
                    Putze deine Zähne jeden Tag 2x für 2 Minuten! 🪥
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={startBrushing}
                    className="text-lg md:text-xl py-6 md:py-7 px-8 rounded-2xl font-display font-bold btn-bounce"
                  >
                    Nochmal üben!
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

export default ToothBrushingGamePage;