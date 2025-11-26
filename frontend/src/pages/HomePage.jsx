import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, Palette, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const HomePage = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'math',
      title: 'Mathe-Spiele',
      description: 'Lerne Mathematik mit Spaß!',
      icon: Calculator,
      color: 'from-primary to-primary-light',
      path: '/math'
    },
    {
      id: 'draw',
      title: 'Malen & Zeichnen',
      description: 'Werde kreativ mit Farben!',
      icon: Palette,
      color: 'from-accent to-accent-light',
      path: '/draw'
    }
  ];

  return (
    <div className="min-h-screen star-pattern flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground">
              ENISSA
            </h1>
            <Star className="w-8 h-8 md:w-10 md:h-10 text-accent" />
          </div>
          <p className="text-lg md:text-xl font-medium text-muted-foreground">
            Deine Lern- und Spiel-App!
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <motion.div
                key={game.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15
                }}
              >
                <Card className="h-full overflow-hidden border-2 hover:border-primary transition-all duration-300 shadow-medium hover:shadow-large">
                  <div className="h-full flex flex-col">
                    {/* Colorful Header */}
                    <div className={`bg-gradient-to-br ${game.color} p-8 md:p-12 text-center`}>
                      <div className="inline-block p-4 md:p-6 bg-card rounded-2xl shadow-large mb-4">
                        <Icon className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-card mb-2">
                        {game.title}
                      </h2>
                      <p className="text-base md:text-lg text-card/90 font-medium">
                        {game.description}
                      </p>
                    </div>

                    {/* Button Area */}
                    <div className="p-6 md:p-8 mt-auto">
                      <Button
                        size="lg"
                        onClick={() => navigate(game.path)}
                        className="w-full text-lg md:text-xl py-6 md:py-8 rounded-2xl font-display font-bold shadow-medium hover:shadow-large btn-bounce bg-gradient-to-r from-primary to-primary-light hover:opacity-90 border-0"
                      >
                        Jetzt spielen! 🎮
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Fun decoration elements */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 text-3xl md:text-4xl">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              ⭐
            </motion.span>
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.2 }}
            >
              🌟
            </motion.span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.4 }}
            >
              ✨
            </motion.span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-muted-foreground font-medium">
          Viel Spaß beim Lernen und Spielen! 🎉
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
