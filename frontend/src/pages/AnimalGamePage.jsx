import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Globe, MapPin, Award, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { usePlayerName } from '@/components/PlayerProfile';

const AnimalGamePage = () => {
  const navigate = useNavigate();
  const playerName = usePlayerName();
  const [gameState, setGameState] = useState('menu');
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedContinent, setSelectedContinent] = useState(null);

  const animals = [
    { emoji: '🦁', name: 'Löwe', continent: 'Afrika', habitat: 'Savanne', fact: 'Der König der Tiere lebt in Rudeln!' },
    { emoji: '🐘', name: 'Elefant', continent: 'Afrika', habitat: 'Savanne & Wald', fact: 'Das größte Landtier der Welt!' },
    { emoji: '🐼', name: 'Panda', continent: 'Asien', habitat: 'Bergwälder', fact: 'Isst nur Bambus - bis zu 40kg am Tag!' },
    { emoji: '🦘', name: 'Känguru', continent: 'Australien', habitat: 'Grasland', fact: 'Kann bis zu 3 Meter hoch springen!' },
    { emoji: '🐧', name: 'Pinguin', continent: 'Antarktis', habitat: 'Eis & Ozean', fact: 'Kann nicht fliegen, aber super schwimmen!' },
    { emoji: '🦎', name: 'Leguan', continent: 'Südamerika', habitat: 'Regenwald', fact: 'Kann seinen Schwanz abwerfen!' },
    { emoji: '🦒', name: 'Giraffe', continent: 'Afrika', habitat: 'Savanne', fact: 'Das höchste Tier der Welt - bis 6 Meter!' },
    { emoji: '🐻', name: 'Braunbär', continent: 'Europa', habitat: 'Wälder', fact: 'Hält Winterschlaf und isst sehr gerne Honig!' },
    { emoji: '🐅', name: 'Tiger', continent: 'Asien', habitat: 'Dschungel', fact: 'Die größte Raubkatze der Welt!' },
    { emoji: '🦫', name: 'Biber', continent: 'Nordamerika', habitat: 'Flüsse', fact: 'Baut Dämme aus Holz und Schlamm!' },
    { emoji: '🦙', name: 'Lama', continent: 'Südamerika', habitat: 'Anden-Gebirge', fact: 'Kann Menschen anspucken wenn es sauer ist!' },
    { emoji: '🦓', name: 'Zebra', continent: 'Afrika', habitat: 'Savanne', fact: 'Jedes Zebra hat ein einzigartiges Streifenmuster!' },
    { emoji: '🦉', name: 'Eule', continent: 'Europa', habitat: 'Wälder', fact: 'Kann den Kopf um 270 Grad drehen!' },
    { emoji: '🦭', name: 'Robbe', continent: 'Antarktis', habitat: 'Eis & Ozean', fact: 'Kann bis zu 30 Minuten unter Wasser bleiben!' },
    { emoji: '🐨', name: 'Koala', continent: 'Australien', habitat: 'Eukalyptuswälder', fact: 'Schläft bis zu 20 Stunden am Tag!' },
    { emoji: '🦍', name: 'Gorilla', continent: 'Afrika', habitat: 'Regenwald', fact: 'Sehr stark aber auch sehr friedlich!' },
  ];

  const continents = [
    { name: 'Afrika', emoji: '🌍', color: 'from-orange-400 to-red-400' },
    { name: 'Asien', emoji: '🌏', color: 'from-yellow-400 to-orange-400' },
    { name: 'Europa', emoji: '🌍', color: 'from-blue-400 to-green-400' },
    { name: 'Nordamerika', emoji: '🌎', color: 'from-green-400 to-blue-400' },
    { name: 'Südamerika', emoji: '🌎', color: 'from-green-400 to-yellow-400' },
    { name: 'Australien', emoji: '🦘', color: 'from-red-400 to-orange-400' },
    { name: 'Antarktis', emoji: '🧊', color: 'from-cyan-400 to-blue-400' },
  ];

  const startQuiz = () => {
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    setCurrentAnimal(randomAnimal);
    setScore(0);
    setGameState('playing');
  };

  const handleContinentSelect = (continent) => {
    if (continent === currentAnimal.continent) {
      setScore(score + 1);
      toast.success(`Richtig! ${currentAnimal.name} kommt aus ${continent}! 🎉`);
      setTimeout(() => {
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        setCurrentAnimal(randomAnimal);
      }, 2000);
    } else {
      toast.error(`Nicht ganz! ${currentAnimal.name} kommt aus ${currentAnimal.continent}. 🤔`);
      setTimeout(() => {
        setGameState('finished');
      }, 2000);
    }
  };

  const exploreContinents = () => {
    setGameState('explore');
    setSelectedContinent(null);
  };

  const selectAnimalToLearn = (animal) => {
    setCurrentAnimal(animal);
    setGameState('learning');
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

          {gameState === 'playing' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft"
            >
              <Award className="w-5 h-5 text-secondary" />
              <span className="font-display font-bold text-lg">{score} Punkte</span>
            </motion.div>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-6xl">
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
                  🦁🌍
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Tiere der Welt
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                  {playerName !== 'Spieler' ? `${playerName}, l` : 'L'}erne Tiere und ihre Herkunft kennen!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: 'spring' }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-large transition-all duration-300 border-2 hover:border-primary overflow-hidden"
                    onClick={startQuiz}
                  >
                    <div className="bg-gradient-to-br from-primary to-accent p-8 text-center">
                      <div className="text-6xl mb-4">🎯</div>
                      <h3 className="text-3xl font-display font-bold text-card mb-2">
                        Quiz-Modus
                      </h3>
                      <p className="text-lg text-card/90 font-semibold">Rate woher die Tiere kommen!</p>
                    </div>
                    <div className="p-6">
                      <Button className="w-full text-lg py-6 rounded-xl font-display font-bold btn-bounce">
                        Quiz starten!
                      </Button>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-large transition-all duration-300 border-2 hover:border-primary overflow-hidden"
                    onClick={exploreContinents}
                  >
                    <div className="bg-gradient-to-br from-success to-secondary p-8 text-center">
                      <div className="text-6xl mb-4">🌍</div>
                      <h3 className="text-3xl font-display font-bold text-card mb-2">
                        Entdecken
                      </h3>
                      <p className="text-lg text-card/90 font-semibold">Lerne alle Tiere kennen!</p>
                    </div>
                    <div className="p-6">
                      <Button className="w-full text-lg py-6 rounded-xl font-display font-bold btn-bounce">
                        Erkunden!
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}

          {gameState === 'playing' && currentAnimal && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-8"
            >
              <Card className="p-8 md:p-12 shadow-large max-w-2xl mx-auto">
                <div className="text-center space-y-6">
                  <motion.div
                    key={currentAnimal.name}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring' }}
                    className="text-9xl"
                  >
                    {currentAnimal.emoji}
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                    {currentAnimal.name}
                  </h2>

                  <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                    Aus welchem Kontinent kommt dieses Tier?
                  </p>
                </div>
              </Card>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {continents.map((continent, index) => (
                  <motion.div
                    key={continent.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05, type: 'spring' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-large transition-all border-2 hover:border-primary overflow-hidden"
                      onClick={() => handleContinentSelect(continent.name)}
                    >
                      <div className={`bg-gradient-to-br ${continent.color} p-6 text-center`}>
                        <div className="text-5xl mb-2">{continent.emoji}</div>
                        <h3 className="text-lg font-display font-bold text-card">
                          {continent.name}
                        </h3>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {gameState === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Wähle einen Kontinent
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {continents.map((continent, index) => (
                  <motion.div
                    key={continent.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05, type: 'spring' }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-large transition-all border-2 hover:border-primary overflow-hidden"
                      onClick={() => setSelectedContinent(continent.name)}
                    >
                      <div className={`bg-gradient-to-br ${continent.color} p-8 text-center`}>
                        <div className="text-6xl mb-3">{continent.emoji}</div>
                        <h3 className="text-xl font-display font-bold text-card">
                          {continent.name}
                        </h3>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {selectedContinent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-display font-bold text-center text-foreground">
                    Tiere aus {selectedContinent}
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {animals.filter(a => a.continent === selectedContinent).map((animal, index) => (
                      <motion.div
                        key={animal.name}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Card
                          className="cursor-pointer hover:shadow-medium transition-all p-4 text-center"
                          onClick={() => selectAnimalToLearn(animal)}
                        >
                          <div className="text-5xl mb-2">{animal.emoji}</div>
                          <p className="text-sm font-semibold">{animal.name}</p>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {gameState === 'learning' && currentAnimal && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="p-8 md:p-12 shadow-large max-w-3xl mx-auto">
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                    className="text-9xl"
                  >
                    {currentAnimal.emoji}
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                    {currentAnimal.name}
                  </h2>

                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-3 p-4 bg-primary-light rounded-xl">
                      <Globe className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-display font-bold">Kontinent</p>
                        <p className="text-foreground/80">{currentAnimal.continent}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-success-light rounded-xl">
                      <MapPin className="w-6 h-6 text-success" />
                      <div>
                        <p className="font-display font-bold">Lebensraum</p>
                        <p className="text-foreground/80">{currentAnimal.habitat}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-secondary-light rounded-xl">
                      <p className="font-display font-bold mb-2">💡 Wusstest du?</p>
                      <p className="text-foreground/80">{currentAnimal.fact}</p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={() => setGameState('explore')}
                    className="text-lg py-6 px-8 rounded-xl font-display font-bold btn-bounce"
                  >
                    Zurück zur Übersicht
                  </Button>
                </div>
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
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="text-8xl mb-6"
                >
                  {score >= 5 ? '🏆' : score >= 3 ? '⭐' : '🌟'}
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Super{playerName !== 'Spieler' ? `, ${playerName}` : ''}!
                </h2>

                <div className="text-6xl font-display font-bold text-primary mb-6">
                  {score} richtige Antworten
                </div>

                <p className="text-xl text-muted-foreground mb-8">
                  {score >= 5 ? 'Du kennst dich super mit Tieren aus! 🎉' :
                   score >= 3 ? 'Gut gemacht! Übe weiter! 💪' :
                   'Probiere es nochmal! Du schaffst das! 🌟'}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={startQuiz}
                    className="text-lg md:text-xl py-6 md:py-7 px-8 rounded-2xl font-display font-bold btn-bounce"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Nochmal spielen
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

export default AnimalGamePage;